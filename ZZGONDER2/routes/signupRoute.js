const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const { csrfProtection } = require("../Middlewares/csrfMiddleware")
const { db } = require("../Controller/databaseConnection")
const uuid = require('uuid');
const nodemailer = require('nodemailer');

let working  = false;
// ******************************** MAIL GONDERME ISLEMI *************************************
const mailGonder = (targetMail, verificationToken) => {
    console.log("Mali gönderimi başladı...")
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hopeschat@gmail.com',
            pass: 'bduf dtzm rlgk zbqp'
        }
    });

    let mailOptions = {
        from: 'hopeschat@gmail.com',
        to: `${targetMail}`,
        subject: 'E-mail Doğrulama',
        text: `Hesabınızın aktif edilmesi için linke tıklayınız. https://umutsar.net/activation/${verificationToken}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
// ******************************** MAIL GONDERME ISLEMI *************************************



let parseForm = bodyParser.urlencoded({ extended: false });



const isSamePasswords = (password1, password2) => {
    return password1 === password2;
};

const isValidPassword = (password) => {
    return password.length >= 8;
};

const isValidUsername = async (username) => {
    return new Promise((resolve) => {
        db.get("SELECT kullaniciadi FROM kullanicilar WHERE kullaniciadi = ?", [username], (err, row) => {
            if (err) {
                console.log(err.message);
                resolve(false);
            } else {
                resolve(!row); // Eğer row boşsa true, doluysa false döndür
            }
        });
    });
};

const isAvailableEmail = async (email) => {
    return new Promise((resolve) => {
        db.get("SELECT email FROM kullanicilar WHERE email = ?", [email], (err, row) => {
            if (err) {
                console.log(err.message);
                resolve(false);
            } else {
                resolve(!row); // Eğer row boşsa true, doluysa false döndür
            }
        });
    });
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};



const registerUser = async (username, email, password, activationToken) => {
    await db.run("INSERT INTO kullanicilar (kullaniciadi, email, sifre, isActive, activationToken) VALUES (?, ?, ?, ?, ?)", [username, email, password, 0, activationToken]);
    mailGonder(email, activationToken); // E-posta gönder
};

router.post("/signup", parseForm, csrfProtection, async (req, res) => {
    if(working) {
        const emailVerificationToken = uuid.v4();

        const renderPage = (message) => {
            res.render('login', { csrfToken: req.csrfToken(), notActive: 3, content: message });
        };
    
        try {
            if (isValidPassword(req.body.signupPassword)) {
                if (isSamePasswords(req.body.signupPassword, req.body.signupPasswordConfirm)) {
                    if (await isValidEmail(req.body.signupMail)) {
                        if (await isAvailableEmail(req.body.signupMail)) {
                            if (await isValidUsername(req.body.signupUsername)) {
                                // Tüm doğrulamalar geçerli, kullanıcıyı kaydet
                                await registerUser(req.body.signupUsername, req.body.signupMail, req.body.signupPassword, emailVerificationToken);
                                renderPage("Mail adresinizi kontrol edin.");
                            } else {
                                renderPage("Bu kullanıcı adı alınmış!");
                            }
                        } else {
                            renderPage("Bu mail adresi alınmış!");
                        }
                    } else {
                        renderPage("Bu mail adresi geçersiz!");
                    }
                } else {
                    renderPage("Şifreler uyuşmuyor!");
                }
            } else {
                renderPage("Şifre en az 8 haneli olmalı!");
            }
        } catch (error) {
            console.error("Hata:", error.message);
            renderPage("Bir hata oluştu, lütfen tekrar deneyin.");
        }
    }
    
    else {
        res.redirect("/login")
    }
});

module.exports = router;