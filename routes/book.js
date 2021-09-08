const {
    BookController
} = require("../controllers/bookController")

const BookRoutes = (app, passport) => {
    app.post("/book", passport.authenticate("jwt", {
        session: false
    }), BookController.create)
}

module.exports.BookRoutes = BookRoutes