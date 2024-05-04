const express = require('express');
const router = express.Router();
const { csrfProtection } = require("../Middlewares/csrfMiddleware")

router.get('/login', csrfProtection, (req, res) => {
    res.render('login', { csrfToken: req.csrfToken(), notActive: 0 });
});


module.exports = router;