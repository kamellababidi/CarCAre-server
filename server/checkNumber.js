let https = require('https');

module.exports = {
    getVerficationCode: async (number) => {
        return new Promise((resolve, reject) =>
        {

            let data = JSON.stringify({
                api_key: process.env.nexmoAPIKey,
                api_secret: process.env.nexmoSecret,
                brand: 'TestCar',
                number: number
            });

            let options = {
                host: 'api.nexmo.com',
                path: '/verify/json',
                port: 443,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                }
            };

            let req = https.request(options);

            req.write(data);
            req.end();

            let responseData = '';
            req.on('response', function (res) {
                res.on('data', function (chunk) {
                    responseData += chunk;
                });

                res.on('end', function () {
                    resolve(JSON.parse(responseData));
                });
            });
        })

    },

    checkPINNumber: async (request_id, code) => {
        return new Promise((resolve, reject) => {

            let data = JSON.stringify({
                api_key: process.env.nexmoAPIKey,
                api_secret: process.env.nexmoSecret,
                request_id: request_id,
                code: code
            });

            let options = {
                host: 'api.nexmo.com',
                path: '/verify/check/json',
                port: 443,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                }
            };

            let req = https.request(options);

            req.write(data);
            req.end();

            let responseData = '';
            req.on('response', function (res) {
                res.on('data', function (chunk) {
                    responseData += chunk;
                });

                res.on('end', function () {
                    resolve(JSON.parse(responseData));
                });
            });
        })

    }
};