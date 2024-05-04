
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
    service: "Outlook365",
    host: "smtp.office365.com",
    port: "587",
    secure: true,
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
    auth: {
        user: 'hopeschat@hotmail.com',
        pass: 'sqfd7546SQ'
    }
}));


let mailOptions = {
    from: 'hopeschat@hotmail.com',
    to: 'u05398552445@gmail.com',
    subject: 'Admin Info',
    text: `Deneme adlı kullanıcı giriş yaptı.`
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});