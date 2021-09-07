const {
    UserController
} = require("../controllers/userController")

const UsersRoutes = (app, passport) => {
    app.patch("/users/:userId", passport.authenticate("jwt", {
        session: false
    }), UserController.update)
}

module.exports.UsersRoutes = UsersRoutes