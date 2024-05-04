const express = require('express');
const router = express.Router();
const csrfProtection = require("../Middlewares/csrfMiddleware")

const isValidEmail = (email) => {
    // Basit bir mail adresi kontrolü için regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

router.post("/signup", csrfProtection, (req, res) => {
    if (isValidEmail(req.body.signupMail)) {
        res.render('login', { csrfToken: req.csrfToken(), notActive: 0 });
    }
})

module.exports = router;