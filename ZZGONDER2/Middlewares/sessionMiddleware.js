
const session = require("express-session");

const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { originalMaxAge: 24 * 60 * 60 * 60 } // 24 saat
});

module.exports = sessionMiddleware;