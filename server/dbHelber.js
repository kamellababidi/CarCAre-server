const db = require('../models/index');
const bcrypt = require('bcryptjs');
const trans = require('./transHelper');

let dbHelber = {
    getAllCompaniesAndServices: async (cityId) => {
        return new Promise((resolve, reject) => {
            db.companies.findAll({
                where: {
                    cityId: cityId,
                    active: 2
                },
                include: [{
                    model: db.companies_services,
                    include: [{
                        model: db.services
                    }],
                    where: {
                        active: 2
                    }

                }, {
                    model: db.rating,
                    include:[{
                        model: db.members,
                        attributes: ['username']
                    }]
                }]
            }).then((data) => {
                resolve(data);
            }).catch((err) => reject(err));
        })
    },

    getAllServices: async () => {
        return new Promise((resolve, reject) => {
            db.services.findAll().then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })

    },

    createService: async (name, name_arabic) => {
        return new Promise((resolve, reject) => {
            db.services.create({
                name: name,
                name_arabic: name_arabic
            }).then((data) => {
                resolve('Service added successfully!');
            }).catch((err) => {
                reject(err.errors[0].message);
            })
        })
    },

    addNewCompany: async (data) => {
        return new Promise((resolve, reject) => {
            db.companies.create({
                name: data.name,
                name_arabic: data.name_arabic,
                email: data.email,
                phone: data.phone,
                cityId: data.location,
                picture: data.image,
                description: data.description,
                description_arabic: data.description_arabic,
                added_by: 1
            }).then((data2) => {
                for (var key in data.service) {
                    db.companies_services.create({
                        companyId: data2.id,
                        serviceId: data.service[key].id,
                        price: data.service[key].price,
                        description: data.service[key].description,
                        description_arabic: data.service[key].description_arabic
                    }).then((data3) => {
                        resolve(data3);
                    }).catch((err) => {
                        db.companies.destroy({where: {id: data2.id}}).then(() => {
                            reject(err);
                        })
                    })
                }
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getAdmin: async (username, password) => {
        return new Promise((resolve, reject) => {
            db.admins.findOne({where: {username: username}}).then((data) => {
                bcrypt.compareSync(password, data.password) ? resolve(data) : reject(false);
            }).catch((err) => {
                reject(err);
            })

        })

    },

    getCompanies: async () => {
        return new Promise((resolve, reject) => {
            db.companies.findAll({
                include: [{
                    model: db.companies_services,
                    include: [{
                        model: db.services
                    }]

                }, {
                    model: db.city
                }]
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                console.error(err);
            })

        })
    },

    getCompanyById: async (id) => {
        return new Promise(((resolve, reject) => {
            db.companies.findOne({
                where: {id: id},
                include: [{
                    model: db.companies_services,
                    include: [{
                        model: db.services
                    }]
                }, {
                    model: db.city
                }]
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        }))
    },

    createBook: async (data) => {
        return new Promise((resolve, reject) => {
            db.books.create({
                memberId: data.user_id
            }).then((data1) => {
                for (var key in data.services) {
                    db.books_services.create({
                        book_id: data1.id,
                        service_id: data.services[key]
                    }).then((data2) => {
                        resolve({data: data2, result: true});
                    }).catch((err2) => {
                        reject({result: false});
                    })
                }

            }).catch((err1) => {
                reject(false);
            })
        })
    },

    checkLogin: async (faceBook_id) => {
        return new Promise((resolve, reject) => {
            db.members.findOne({
                where: {
                    facebookId: faceBook_id
                }
            }).then((data) => {
                if (data && data.username) {
                    resolve(data);
                } else {
                    resolve(false)
                }
            }).catch((e) => {
                reject(false);
            });
        })
    },

    addCity: async (name, name_arabic) => {
        return new Promise((resolve, reject) => {
            db.city.create({
                name: name,
                name_arabic: name_arabic,
                addedBy: 1
            }).then((data) => {
                resolve('City added successfully!');
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getActiveCities: async (lang) => {
        return new Promise((resolve, reject) => {
            db.city.findAll({
                where: {active: 1}
            }).then((data) => {
                if(lang == 'Arabic') {
                    data = trans.switchArabic(data, true);
                }
                let response = [];
                for (var key in data) {
                    response.push({value: data[key].name, id: data[key].id});
                }
                resolve(response);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getBooksUsers: async () => {
        return new Promise((resolve, reject) => {
            db.books.findAll({
                include: [{
                    model: db.members
                }],
                where: {
                    status: 'open'
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getAllBooks: async () => {
        return new Promise((resolve, reject) => {
            db.books.findAll({
                include: [{
                    model: db.members,
                    attributes: ['username', 'phone', 'id']
                }, {
                    model: db.books_services,
                    include: [{
                        model: db.companies_services,
                        attributes: ['price'],
                        include: [{
                            model: db.companies,
                            attributes: ['name', 'phone']
                        }, {
                            model: db.services,
                            attributes: ['name']
                        }]
                    }]
                }],
                attributes: ['id', 'createdAt', 'status'],
                order: [["createdAt", 'DESC']]
            }).then(async (data) => {
                for (let k in data) {
                    if (!data[k].books_services.length) {
                        await dbHelber.deleteBook(data[k].id);
                        data[k].splice(k, 1)
                    }
                }
                resolve(data);
            }).catch((err) => {
                reject(err)
            });
        })
    },

    acceptBookStatus: async (bookId, driverId) => {
        return new Promise((resolve, reject) => {
            if (driverId) {
                db.books.update({
                    status: 'driver sent',
                    driverId: driverId
                }, {
                    where: {
                        id: bookId
                    }
                }).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            } else {
                db.books.update({
                    status: 'accepted',
                }, {
                    where: {
                        id: bookId
                    }
                }).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            }
        })
    },

    updateCompanyInformation: async (comapnyId, data) => {
        return new Promise((resolve, reject) => {
            db.companies.update({
                name: data.name,
                name_arabic: data.name_arabic,
                email: data.email,
                phone: data.phone,
                description: data.description,
                description_arabic: data.description_arabic,
                cityId: data.location
            }, {
                where: {
                    id: comapnyId
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                deject(err);
            })
        })
    },
    getCompanyServiceById: async (companyId) => {
        return new Promise((resolve, reject) => {
            db.companies_services.findAll({
                where: {
                    companyId: companyId
                },
                include: {
                    model: db.services
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getServicesNotTaken: async (ids) => {
        return new Promise((resolve, reject) => {
            db.services.findAll().then((data) => {
                let notTaken = [];
                let taken = [];
                for (let i = 0; i < data.length; i++) {
                    if (ids.includes(data[i].id)) {
                        taken.push(data[i]);
                    } else {
                        notTaken.push(data[i]);
                    }
                }
                resolve({taken: taken, notTaken: notTaken});
            }).catch((err) => {
                reject(err);
            })
        })
    },

    updateCompanyServices: async (companyId, data) => {
        return new Promise((resolve, reject) => {
            for (var i in data.service) {
                db.companies_services.create({
                    companyId: companyId,
                    serviceId: data.service[i]['id'],
                    price: data.service[i]['price'],
                    description_arabic: data.service[i]['description_arabic'],
                    description: data.service[i]['description'],
                }).then((da) => {
                    resolve(da)
                }).catch((err) => reject(err));
            }
        })
    },

    createBook: async (data) => {
        return new Promise((resolve, reject) => {
            db.members.findOne({
                where: {facebookId: data.id}
            }).then((data2) => {
                db.books.create({
                    memberId: data2.id,
                    latitude: data.location.latitude,
                    longitude: data.location.longitude,
                    locationName: data.location.name
                }).then((data3) => {
                    for (var key in data.services) {
                        db.books_services.create({
                            bookId: data3.id,
                            companiesServiceId: data.services[key]
                        }).then((data4) => {
                            resolve({data: data4, bookId: data3.id});
                        }).catch((err) => {
                            reject(err);
                        })
                    }
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getBooksById: async (id) => {
        return new Promise((resolve, reject) => {
            db.members.findOne({
                where: {facebookId: id}
            }).then((data) => {
                if (data) {
                    db.books.findAll({
                        where: {memberId: data.id},
                        include: [{
                            model: db.books_services,
                            include: [{
                                model: db.companies_services,
                                attributes: ['id', 'price', 'companyId'],
                                include: [{
                                    model: db.companies,
                                    attributes: ['name', 'name_arabic', 'picture']
                                }, {
                                    model: db.services,
                                    attributes: ['name', 'name_arabic']
                                }]
                            }],
                            attributes: ['id']
                        }],
                        attributes: ['id', 'status']
                    }).then(async (books) => {
                        for (let k in books) {
                            if (!books[k].books_services.length) {
                                await dbHelber.deleteBook(books[k].id);
                                books[k].splice(k, 1)
                            }
                        }
                        resolve(books);
                    }).catch((err) => {
                        reject(err);
                    })
                } else {
                    reject('id didn\'t match');
                }
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getCompanyByServiceId: async (serviceId) => {
        return new Promise((resolve, reject) => {
            db.companies_services.findOne({
                where: {id: serviceId}
            }).then((data) => {
                db.companies.findOne({
                    where: {id: data.companyId}
                }).then((company) => {
                    resolve(company);
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getBooksByIdForCompany: async (bookId) => {
        return new Promise((resolve, reject) => {
            db.books.findOne({
                where: {id: bookId},
                attributes: ['id', 'status', 'locationName', 'latitude', 'longitude'],
                include: [{
                    model: db.members,
                    attributes: ['username', 'phone']
                }, {
                    model: db.books_services,
                    attributes: ['id'],
                    include: [{
                        model: db.companies_services,
                        attributes: ['id', 'companyId'],
                        include:[{
                            model: db.services,
                            attributes: ['name']
                        }]
                    }]
                }, {
                    model: db.drivers,
                    attributes: ['name', 'phone']
                }]
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err)
            })
        })
    },

    addDriver: async (data) => {
        return new Promise((resolve, reject) => {
            db.drivers.findOne({
                where: {
                    name: data.name,
                    companyId: data.companyId
                }
            }).then((data2) => {
                    if (data2) {
                        resolve(data2);
                    } else {
                        db.drivers.create({
                            name: data.name,
                            phone: data.phone,
                            car: data.car,
                            companyId: data.companyId
                        }).then((data2) => {
                            resolve(data2);
                        }).catch((err) => {
                            reject(err);
                        })
                    }
                }).catch((err) => {
                    reject(err);
                })
            })
    },

    completeBook: async (bookId) => {
        return new Promise((resolve, reject) => {
            db.books.update({
                status: 'done'
            }, {
                where: {
                    id: bookId
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    createMember: async (username, id) => {
        return new Promise((resolve, reject) => {
            db.members.create({
                username: username.trim(),
                facebookId: id.trim()
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    addPhone: async (id, phone) => {
        return new Promise((resolve, reject) => {
            db.members.update({
                phone: phone
            }, {
                where: {
                    facebookId: id
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    phoneVerified: async (id) => {
        return new Promise((resolve, reject) => {
            db.members.update({
                verified: 2
            }, {
                where: {
                    facebookId: id
                }
            }).then((data) => resolve(data))
                .catch((err) => reject(err))
        })
    },

    checkPhone: async (id) => {
        return new Promise((resolve, reject) => {
            db.members.findOne({
                where: {
                    facebookId: id,
                    verified: 2
                }
            }).then((data) => resolve(data))
                .catch((err) => reject(err))
        })
    },

    addRating: async (data, id) => {
        let comment = data.comment ? data.comment : null;
        return new Promise((resolve, reject) => {
            db.rating.create({
                companyId: data.companyId,
                memberId: id,
                rating: data.rating,
                comment: comment
            }).then((data2) => {
                resolve(data2);
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    },

    calculateAverages: async (data) => {
        return new Promise((resolve) => {
            if (data && data.length) {
                for (let i = 0; i < data.length; i++) {
                    let total = 0;
                    let count = 0;
                    let average = 0;
                    for (let k = 0; k < data[i].ratings.length; k++) {
                        total += data[i].ratings[k].rating;
                        count++;
                    }
                    if (count > 0) {
                        average = total / count;
                    }

                    data[i]['averageRating'] = average;
                }
            }
            resolve(data);
        })
    },

    getMemberByFBId: async (FBId) => {
        return new Promise((resolve, reject) => {
            db.members.findOne({
                where: {
                    facebookId: FBId
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getComments: async (companyId) => {
        return new Promise((resolve, reject) => {
            db.rating.findAll({
                where: {
                    companyId: companyId
                },
                include: {
                    model: db.members,
                    attributes: ['username']
                },
                attributes: ['rating', 'comment', 'createdAt']
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    checkIfRated: async (userId, companyId) => {
        return new Promise((resolve, reject) => {
            db.rating.findOne({
                where: {
                    memberId: userId,
                    companyId: companyId
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    deactivateCompany: async (id) => {
        return new Promise((resolve, reject) => {
            db.companies.update({
                active: 1
            }, {
                where: {
                    id: id
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    activateCompany: async (id) => {
        return new Promise((resolve, reject) => {
            db.companies.update({
                active: 2
            }, {
                where: {
                    id: id
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    activateService: async (id) => {
        return new Promise((resolve, reject) => {
            db.companies_services.update({
                active: 2
            }, {
                where: {
                    id: id
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    deactivateService: async (id) => {
        return new Promise((resolve, reject) => {
            db.companies_services.update({
                active: 1
            }, {
                where: {
                    id: id
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    getAllCities: async () => {
        return new Promise((resolve, reject) => {
            db.city.findAll().then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    activateCity: async (id) => {
        return new Promise((resolve, reject) => {
            db.city.update({
                active: 1
            }, {
                where: {
                    id: id
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    deactivateCity: async (id) => {
        return new Promise((resolve, reject) => {
            db.city.update({
                active: 2
            }, {
                where: {
                    id: id
                }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    },

    hasCompany: async (id) => {
        return new Promise((resolve, reject) => {
            db.companies.findAll({
                where: {
                    cityId: id,
                    active: 2
                }
            }).then((data) => {
                if (data.length) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    },

    findUser: async (username) => {
        return new Promise((resolve, reject) => {
            db.members.findOne({
                where: {
                    username: username
                }
            }).then((data) => {
                if (data && data.username) {
                    resolve(data);
                } else {
                    resolve(false)
                }
            }).catch((e) => {
                reject(false);
            });
        })
    },

    saveURL: (url, bookId) => {
        db.books.update({
            url: url,
        }, {
            where: {
                id: bookId
            }
        })
    },

    editPrices: async (data) => {
        return new Promise((resolve, reject) => {
            for (let key in data) {
                db.companies_services.update({
                    price: data[key]
                }, {
                    where: {
                        id: key
                    }
                }).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            }
        })
    },

    deleteCompany: async (companyId) => {
        return new Promise((resolve, reject) => {
            db.companies.findOne({
                where: {
                    id: companyId
                }
            }).then((company) => {
                company.destroy()
            }).then((result) => {
                resolve(result);
        }).catch((err) => {
            reject(err);
        })
        })
    },

    deleteBook: async (id) => {
        return new Promise((resolve, reject) => {
            db.books.findOne({
                where: {
                    id: id
                }
            }).then((data) => {
                data.destroy();
            }).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.error(err);
                reject (err);
            })
        })
    },

    deleteAllBooks: async () => {
        return new Promise((resolve, reject) => {
            db.books.findAll().then(async (data) => {
                for (var k in data) {
                    await dbHelber.deleteBook(data[k].id);
                }
                resolve('true');
            }).catch((err) => {
                reject(err);
            })
        })
    }

};

module.exports = dbHelber;