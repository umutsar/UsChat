const express = require('express');
const router = express.Router();
const { csrfProtection } = require("../Middlewares/csrfMiddleware")
const bodyParser = require("body-parser")
const sqlite3 = require("sqlite3").verbose()


const db = new sqlite3.Database("mesajlar.db");

let parseForm = bodyParser.urlencoded({ extended: false });


router.post('/login', parseForm, csrfProtection, (req, res) => {
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