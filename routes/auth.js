const {
    AuthController
} = require("../controllers/authController")

const authRoutes = (app, passport) => {
    app.post('/auth/login', AuthController.login);

    app.get("/auth/validate", passport.authenticate("jwt", {
        session: false
    }), AuthController.validate)

    app.post("/auth/signup", AuthController.signup)

}

module.exports.authRoutes = authRoutes;

//POSt GRES
//create database dbname
// \c databasename
// squalize cli, squelize init
// sequelize migration:generate --name create-users
// nodemon