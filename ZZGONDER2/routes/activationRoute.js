const express = require('express');
const { db } = require('../Controller/databaseConnection');
const router = express.Router();


const createUserChatQuery = `
	"id"	INTEGER,
	"user"	TEXT UNIQUE,
	"connection"	INTEGER DEFAULT 1,
	"isBlocked"	BLOB DEFAULT 0,
	"date"	TEXT,
	"time"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT);
`

router.get("/activation/:activationCode", (req, res) => {
    console.log(req.params)

    db.run("UPDATE kullanicilar SET isActive = ? WHERE activationToken = ?", [1, req.params.activationCode], (err) => {
        if (err) {
            console.log(err);
        } else {
            db.get("SELECT kullaniciadi FROM kullanicilar WHERE activationToken = ?", [req.params.activationCode], (err, row) => {
                if (row) {
                    db.run(`CREATE TABLE IF NOT EXISTS ${row.kullaniciadi} (${createUserChatQuery});`, function (err) {
                        if (err) {
                            return console.error('İlk tablo oluşturulurken hata:', err.message);
                        }
                    });
                }
            })

            res.send("</h4> Hesabınız başarılı bir şekilde aktif edilmiştir. <a href='https://umutsar.net'>Giriş Yap</a> </h4>")
        }
    });

})


module.exports = router;