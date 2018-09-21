const express = require('express');
const db = require('./dbHelber');
const bodyParser = require('body-parser');
const app = express();
const http = require('xmlhttprequest').XMLHttpRequest;
const xhttpRequest = new http();
const checkNumber = require('./checkNumber');
const auth = require('./authHelper');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const session = require('express-session');
const Nexmo = require('nexmo');
const trans = require('./transHelper');
const BitlyClient = require('bitly');
const bitly = BitlyClient('2538880d9485d315bc9b949fcff19ed6d18cf0e0');
const dateFormat = require('dateformat');



const nexmo = new Nexmo({
    apiKey: process.env.nexmoAPIKey,
    apiSecret: process.env.nexmoSecret
});

const from = 'carCare';
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('./Public'));
app.use(bodyParser({limit: '50mb'}));
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.exSecret,
}));


app.set('view engine', 'pug');

app.get('/companies/:lang', async (req, res) => {
    let cityId = req.query.id;
    let lang = req.params.lang;
    let data = await db.getAllCompaniesAndServices(cityId);
    if (lang == 'Arabic') {
        data = trans.switchArabic(data, true);
    }
    let dataWithAverage = await db.calculateAverages(data);
    res.json(dataWithAverage).end();
});

app.post('/checkPhone', async (req, res) => {
    let phone = req.body.country.callingCode + '' + req.body.phone.phoneNumber;
    let id = await auth.authCheck(req.body.facebookId);
    try {
        const response = await checkNumber.getVerficationCode(phone);
        if (id.id.username) {
            const addPhone = await db.addPhone(req.body.facebookId, phone);
        } else {
            const addPhone = await db.addPhone(id.id, phone);
        }
        res.json({request_id: response.request_id, status: response.status}).end();
    } catch (e) {
        console.log(e);
        res.json(e).end();
    }
});

app.post('/hasPhone', async (req, res) => {
    try {
        const id = await auth.authCheck(req.body.facebookId);
        if (id.id.username) {
            let phone = await db.checkPhone(req.body.facebookId);

            if (typeof (phone.phone) !== 'undefined') {
                res.json({phone: phone.phone, status: true}).end();
            } else {
                res.json({status: false}).end();
            }
        } else {
            let phone = await db.checkPhone(id.id);

            if (typeof (phone.phone) !== 'undefined') {
                res.json({phone: phone.phone, status: true}).end();
            } else {
                res.json({status: false}).end();
            }
        }
    } catch (e) {
        res.json(e).end();
    }
});

app.post('/verifyPhone', async (req, res) => {
    try {
        const response = await checkNumber.checkPINNumber(req.body.requestId, req.body.code);
        if (response.status !== '0') {
            res.json({status: false}).end();
        } else {
            let id = await auth.authCheck(req.body.facebookId);
            if (id.id.username) {
                await db.phoneVerified(req.body.facebookId);
            } else {
                await db.phoneVerified(id.id);
            }
            res.json({status: true}).end();
        }
    } catch (e) {
        console.log(e);
        res.json({status: false, error: e}).end();
    }
});

app.post('/book', async (req, res) => {
    let response = [];
    let data = req.body.userData;
    var Company;
    var count = 0;
    for (let $i = 0; $i < 1; $i++) {
        try {
            let company = await db.getCompanyByServiceId(data.services[$i]);
            Company = company;
            count++;
        } catch (e) {
            console.log(e);
        }
    }
    if (count > 0 && Company) {
        try {
            const id = await auth.authCheck(data['id']);
            if (!id.id.username) {
                data['id'] = id.id;
            }

            xhttpRequest.onreadystatechange = async function () {
                if (xhttpRequest.readyState == 4 && xhttpRequest.status == 200) {
                    response = JSON.parse(this.responseText);
                    data['location']['name'] = response.results[0]['formatted_address'];
                    try {
                        const result = await db.createBook(data);
                        let token = await auth.creatToken(result.bookId);
                        const to =  Company.phone; // to make the sms go to the company just put Company.phone;
                        const url =  await bitly.shorten('http://159.65.113.8:8007/acceptBook?token=' + token);
                        // const url =  await bitly.shorten('http://firas-box.ngrok.io/acceptBook?token=' + token);
                        const text = Company.name + ' you have an order, \n please check it at \n ' + url.data.url;
                        db.saveURL(url.data.url, result.bookId);
                        nexmo.message.sendSms(from, to, text, (error, response) => {
                            if (error) {
                                res.json(error).end();
                            } else if (response.messages[0].status != '0') {
                                res.end('Nexmo returned back a non-zero status');
                            }
                        });
                        res.json({done: true}).end();
                    } catch (err) {
                        console.log(err);
                        res.json({done: false}).end();
                    }
                }
            };

            xhttpRequest.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.location.latitude},${data.location.longitude}&key=${process.env.googleAPI}`);
            xhttpRequest.send();
        } catch (err) {
            console.log(err);
            res.json({done: false}).end();
        }
    }
});


app.post('/addcompany', async (req, res) => {
    let pic = req.body.image;
    data = req.body;
    let base64Data = pic.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(`./Public/uploaded/companies/${data.name}.png`, base64Data, 'base64', async (err) => {
        if (err) {
            res.status(500).json(err).end();
        } else {
            data['image'] = `${data.name}.png`;
            try {
                result = await db.addNewCompany(req.body);
                res.status(200).json(result).end();
            } catch (err) {
                console.error(err);
                res.status(409).send(err).end();
            }
        }
    });
});

app.post('/auth/facebook', async (req, res) => {
    if (req.body) {
        try {
            const pass = await auth.authCheck(req.body.auth);
            if (pass.id) {
                res.json({loggedIn: true, token: req.body.auth}).end();
            }
        } catch (e) {
            xhttpRequest.open('GET', 'https://graph.facebook.com/me?access_token=' + req.body.auth);
            xhttpRequest.send();

            xhttpRequest.onreadystatechange = async function () {
                if (xhttpRequest.readyState == 4 && xhttpRequest.status == 200) {
                    if (this.responseText) {
                        let response = JSON.parse(this.responseText);
                        try {
                            const loggedIn = await db.checkLogin(response.id);
                            const authe = await auth.creatToken(response.id);
                            if (loggedIn) {
                                res.json({loggedIn: true, token: authe}).end();

                            } else {
                                const created = await db.createMember(response.name, response.id);
                                res.json({loggedIn: false, token: authe}).end();
                            }
                        } catch (err) {
                            console.log(err);
                            res.json(err).end();
                        }
                    } else {
                        res.end('invalid access token');
                    }
                }
            };
        }
    } else {
        res.json({loggedIn: false});
    }
});

app.get('/', async (req, res) => {
    if (req.session.user) {
        res.render('../dashboard/index', {name: req.session.user});
    } else {
        res.render('../dashboard/login');
    }
});

app.post('/loginAdmin', async (req, res) => {
    try {
        const data = await db.getAdmin(req.body.username, req.body.password);
        req.session.user = data.username;
        req.session.save((err, err2) => {
            console.log(err, err2);
        });
        res.render('../dashboard/index', {name: data.username})
    } catch (err) {
        res.sendStatus(404).end();
    }
});

app.get('/add', async (req, res) => {
    if (req.session.user) {
        const data = await db.getAllServices();
        const cities = await db.getActiveCities();
        res.render('../dashboard/index', {addcompany: true, services: data, cities: cities});
    } else {
        res.render('../dashboard/login');
    }
});

app.get('/service', async (req, res) => {
    if (req.session.user) {
        const cities = await db.getAllCities();
        res.render('../dashboard/index', {addservice: true, data: cities});
    } else {
        res.render('../dashboard/login');
    }
});

app.post('/addservice', async (req, res) => {
    try {
        const data = await db.createService(req.body.name, req.body.name_arabic);
        res.render('../dashboard/index', {addservice: true, sucsMessage: data});
    } catch (err) {
        res.render('../dashboard/index', {addservice: true, errMessage: err});
    }
});

app.post('/addcity', async (req, res) => {
    try {
        const data = await db.addCity(req.body.cityName, req.body.cityNameArabic);
        const cities = await db.getAllCities();
        res.render('../dashboard/index', {addservice: true, sucsMessage: data, data: cities})
    } catch (err) {
        res.render('../dashboard/index', {addservice: true, errMessage: err})
    }
});

app.get('/edit', async (req, res) => {
    if (req.session.user) {
        try {
            const data = await db.getCompanies();
            res.render('../dashboard/index', {editcompanies: true, data: data})
        } catch (err) {
            res.json(err);
        }
    } else {
        res.render('../dashboard/login');
    }
});

app.get('/editcomp', async (req, res) => {
    if (req.session.user) {
        try {
            const data = await db.getCompanyById(req.query.id);
            const cities = await db.getActiveCities();
            res.render('../dashboard/index', {editcompanies: true, edit: data, cities: cities})
        } catch (err) {
            res.json(err).end();
        }
    } else {
        res.render('../dashboard/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('../dashboard/login');
});


app.get('/active/:lang', async (req, res) => {
    try {
        let lang = req.params.lang;
        let data = await db.getActiveCities(lang);
        let response = [];
        for (var i = 0; i < data.length; i++) {
            if (await db.hasCompany(data[i].id)) {
                response.push(data[i]);
            }
        }
        res.json(response).end();
    } catch (err) {
        console.log(err);
        res.end();
    }
});

app.get('/showbooks', async (req, res) => {
    if (req.session.user) {
        try {
            const data = await db.getAllBooks();
            for (var k in data) {
                data[k]['date_created'] = dateFormat(data[k].createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");
            }
            res.render('../dashboard/index', {books: true, data: data})
        } catch (err) {
            res.json(err).end();
        }
    } else {
        res.render('../dashboard/login');
    }
});

app.get('/accept', async (req, res) => {
    if (req.session.user) {
        let bookId = req.query.id;
        try {
            const result = await db.changeBookStatus(bookId);
            const data = await db.getAllBooks();
            res.render('../dashboard/index', {books: true, data: data})
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    } else {
        res.render('../dashboard/login');
    }
});

app.post('/editCompany', async (req, res) => {
    if (req.session.user) {
        let companyId = req.query.id;
        try {
            const result = await db.updateCompanyInformation(companyId, req.body);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    } else {
        res.render('../dashboard/login');
    }
});

app.get('/editCompanyService', async (req, res) => {
    if (req.session.user) {
        try {
            let ids = [];
            const taken = await db.getCompanyServiceById(req.query.id);
            for (var i in taken) {
                ids.push(taken[i]['serviceId']);
            }
            const services = await db.getServicesNotTaken(ids);
            res.render('../dashboard/index', {editcompanies: true, editService: req.query.id, services: services.notTaken, taken: taken})
        } catch (err) {
            res.json(err);
        }
    } else {
        res.render('../dashboard/login');
    }

});

app.post('/editCompanyService', async (req, res) => {
    if (req.session.user) {
        let companyId = req.query.id;
        try {
            const result = await db.updateCompanyServices(companyId, req.body);
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    } else {
        res.render('../dashboard/login');
    }

});

app.post('/myBooks/:lang', async (req, res) => {
    let lang = req.params.lang;
    const id = await auth.authCheck(req.body.id);
    try {
        if (id.id.username) {
            let books = await db.getBooksById(req.body.id);

            if (lang == 'Arabic') {
                books = trans.switchArabic(books, true);
            }
            res.json(books).end();
        } else {
            let books = await db.getBooksById(id.id);

            if (lang == 'Arabic') {
                books = trans.switchArabic(books, true);
            }
            res.json(books).end();
        }
    } catch (err) {
        console.error(err);
        res.json(err).end();
    }
});

app.get('/acceptBook', async (req, res) => {
    try {
        const bookId = await auth.authCheck(req.query.token);
        const formData = await db.getBooksByIdForCompany(bookId.id);
        let tokenData = {};
        tokenData['customer'] = formData['member']['username'];
        tokenData['phone'] = formData['member']['phone'];
        tokenData['location'] = formData['locationName'];
        tokenData['status'] = formData['status'];
        tokenData['bookId'] = formData['id'];
        tokenData['locationLink'] = `https://www.google.com/maps/?q=${formData['latitude']},${formData['longitude']}`;
        if (formData['driver']) {
            tokenData['driver'] = {};
            tokenData['driver']['name'] = formData['driver']['name'];
            tokenData['driver']['phone'] = formData['driver']['phone'];
        }
        tokenData['services'] = [];
        for (var key in formData['books_services']) {
            tokenData['companyId'] = formData['books_services'][key]['companies_service']['companyId'];
            tokenData['services'].push({name: formData['books_services'][key]['companies_service']['service']['name']})
        }

        res.render('../dashboard/phoneForm', {data: tokenData});
    } catch (e) {
        res.render('../dashboard/error', {data: JSON.stringify(e)});
    }
});

app.post('/acceptBookFormOne', async (req, res) => {
    driver = {};
    driver['name'] = req.body.name;
    driver['phone'] = req.body.phone;
    driver['car'] = req.body.car;
    driver['companyId'] = req.body.companyId;
    try {
        const addDriver = await db.addDriver(driver);
        const changeStatus = await db.acceptBookStatus(req.body.bookId, addDriver.id);
        res.json(changeStatus).end();
    } catch (err) {
        res.json(err).end();
    }
});

app.post('/completeBook', async (req, res) => {
    try {
        const done = await db.completeBook(req.body.bookId);
        res.json(done).end();
    } catch (e) {
        res.json(e).end();
    }
});

app.post('/rate', async (req, res) => {
    try {
        const id = await auth.authCheck(req.body.token);
        if (id.id.username) {
            const userId = await db.getMemberByFBId(req.body.token);
            const checkRate = await db.checkIfRated(userId.id, req.body.companyId);

            if (!checkRate) {
                const ratingResult = await db.addRating(req.body, userId.id);
                res.json({result: true}).end();
            } else {
                res.json({result: false, reason: 'Already Rated'});
            }

        } else {
            const userId = await db.getMemberByFBId(id.id);
            const checkRate = await db.checkIfRated(userId.id, req.body.companyId);

            if (!checkRate) {
                const ratingResult = await db.addRating(req.body, userId.id);
                res.json({result: true}).end();
            } else {
                res.json({result: false, reason: 'Already Rated'});
            }

        }
    } catch (e) {
        console.log(e);
        res.json({result: false, err: e}).end();
    }
});

app.post('/getRate', async (req, res) => {
    try {
        const data = await db.getComments(req.body.companyId);
        res.json(data).end();
    } catch (e) {
        console.log(e);
        res.json(e).end();
    }
});

app.get('/deactivateCompany', async (req, res) => {
    if (req.session.user) {
        try {
            let id = req.query.id;
            const deactivate = await db.deactivateCompany(id);
            res.redirect('back');
        } catch (e) {
            console.log(e);
            res.json(e).end();
        }
    } else {
        res.render('../dashboard/login');
    }

});

app.get('/activateCompany', async (req, res) => {
    if (req.session.user) {
        try {
            let id = req.query.id;
            const deactivate = await db.activateCompany(id);
            res.redirect('back');
        } catch (e) {
            console.log(e);
            res.json(e).end();
        }
    } else {
        res.render('../dashboard/login');
    }

});

app.get('/activateService', async (req, res) => {
    if (req.session.user) {
        try {
            let id = req.query.id;
            const deactivate = await db.activateService(id);
            res.redirect('back');
        } catch (e) {
            console.log(e);
            res.json(e).end();
        }
    } else {
        res.render('../dashboard/login');
    }

});

app.get('/deactivateService', async (req, res) => {
    if (req.session.user) {
        try {
            let id = req.query.id;
            const deactivate = await db.deactivateService(id);
            res.redirect('back');
        } catch (e) {
            console.log(e);
            res.json(e).end();
        }
    } else {
        res.render('../dashboard/login');
    }

});

app.get('/activateCity', async (req, res) => {
    if (req.session.user) {
        try {
            let id = req.query.id;
            const deactivate = await db.activateCity(id);
            res.redirect('back');
        } catch (e) {
            console.log(e);
            res.json(e).end();
        }
    } else {
        res.render('../dashboard/login');
    }

});

app.get('/deactivateCity', async (req, res) => {
    if (req.session.user) {
        try {
            let id = req.query.id;
            const deactivate = await db.deactivateCity(id);
            res.redirect('back');
        } catch (e) {
            console.log(e);
            res.json(e).end();
        }
    } else {
        res.render('../dashboard/login');
    }

});

app.post('/signup', async (req, res) => {
    try {
        let checkPass;
        const passHashed = await auth.creatToken(req.body);
        const alreadyExist = await db.findUser(req.body.username);
        if (alreadyExist) {
            checkPass = await auth.checkPass(req.body.password, alreadyExist.facebookId);
        }
        if (checkPass) {
            res.json({token: alreadyExist.facebookId}).end();
        } else {
            const signed = await db.createMember(req.body.username, passHashed);
            res.json({token: passHashed}).end();
        }
    } catch (e) {
        if (e.errors && typeof(e.errors[0].message) !== 'undefined') {
            res.json({info: 'already exist'})
        } else {
            res.json(e).end();
        }
    }
});

app.post('/editServicesPrices', async (req, res) => {
    if (req.session.user) {
        try {
            const edited = await db.editPrices(req.body);
            res.json(edited).end();
        } catch (e) {
            console.log(e);
            res.json(e).end();
        }
    } else {
        res.render('../dashboard/login');
    }
});

app.delete('/deleteCompany', async (req, res) => {
    if (req.session.user) {
        try {
            let companyId = req.query.id;
            const deleted = await db.deleteCompany(companyId);
            res.json(deleted).end();
        } catch (e) {
            console.log(e);
            res.json(e).end();
        }
    } else {
        res.render('../dashboard/login');
    }
});

app.get('/acceptBookAuto', async (req, res) => {
    await db.acceptBookStatus(req.query.id, false);
    res.end();
});

app.delete('/deleteAllBooks', async (req, res) => {
    console.log('here');
    try {
        await db.deleteAllBooks();
        res.end();
    } catch (e) {
        res.json(e).end();
    }
});
let port = process.env.PORT || 8007;
app.listen(port, () => console.log(`carCare app is listening on port ${port}!`));