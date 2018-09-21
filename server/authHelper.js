require('dotenv').load();
const jwt = require('jsonwebtoken');

let auth = {
    creatToken: async (socialToken) => {
        return new Promise((resolve, reject) => {
            var token = jwt.sign({ id: socialToken }, process.env.secret, {
                expiresIn: 604800 // expires in 24 hours
            });
            resolve(token);
        })

    },

    authCheck: async function (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }

            })
        })
    },

    checkPass: async (pass, hash) => {
        return new Promise(async (resolve) => {
            let unhashed = await auth.authCheck(hash);
            if (unhashed.id.password == pass) {
                resolve(true);
            } else {
                resolve(false);
            }
        })

    }
};

module.exports = auth;