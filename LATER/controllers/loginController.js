const registerView = (req, res) => {
    res.render("register", {
    } );
}
// For View 
const loginView = (req, res) => {

    res.render("login", {
    } );
}
module.exports =  {
    registerView,
    loginView
};

