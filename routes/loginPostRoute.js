const express = require('express');
const router = express.Router();
const { csrfProtection } = require("../Middlewares/csrfMiddleware")
const bodyParser = require("body-parser");
const { getCurrentTime } = require('../Modules/TimeFunction');
const sqlite3 = require("sqlite3").verbose()
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const db = new sqlite3.Database("mesajlar.db");

let parseForm = bodyParser.urlencoded({ extended: false });


router.post('/login', parseForm, csrfProtection, (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    console.log("Bu işletim sistemi: ", userAgent)
    const { username, password } = req.body;


    db.get('SELECT * FROM kullanicilar WHERE kullaniciadi = ? AND sifre = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (row) {
            if (row['isActive'] == 1) {
                req.session.username = String(username);


                // ADMIN'e MAIL GONDERME İŞLEMİ: 

                if (username != "admin" && username != "umut") {
                    console.log(`[${getCurrentTime()}] ${username} adlı kullanıcı giriş yaptı. (${ip})`)
                    
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'hopeschat@gmail.com',
                          pass: 'bduf dtzm rlgk zbqp'
                        }
                    });

                    let mailOptions = {
                        from: 'hopeschat@gmail.com',
                        to: 'u05398552445@gmail.com',
                        subject: 'Admin Info',
                        text: `[${getCurrentTime()}] ${username} adlı kullanıcı giriş yaptı. (${ip})`
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }


                res.redirect('/chat.html');
            }

            else {
                res.render('login', { csrfToken: req.csrfToken(), notActive: 1 });
            }


        } else {
            res.render('login', { csrfToken: req.csrfToken(), notActive: 2 });
        }
    });
});

module.exports = router;