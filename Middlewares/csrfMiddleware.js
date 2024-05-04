const csrf = require("csurf")
let csrfProtection = csrf({ cookie: true });

module.exports = { csrfProtection };