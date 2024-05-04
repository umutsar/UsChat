const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// Login page routes
router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

module.exports = router;
