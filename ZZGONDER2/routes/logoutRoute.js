const express = require("express");
const router = express.Router();

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Oturumu sonlandırma hatası:', err);
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;
