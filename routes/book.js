const {
    BookController
} = require("../controllers/bookController")

const BookRoutes = (app, passport) => {
    app.post("/books", passport.authenticate("jwt", {
        session: false
    }), BookController.create)

    app.get("/books", passport.authenticate("jwt", {
        session: false
    }), BookController.getAll)
}

module.exports.BookRoutes = BookRoutes