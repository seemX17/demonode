const models = require("../../models");

module.exports.CreateBook = async (req, res) => {
    let author = await models.users.findOne({
        where: {
            id: req.body.author
        }
    })

    if (!author) {
        res.status(404).send("Author not found")
    }

    let book = await models.books.create({
        name: req.body.name,
        author: author.id,
        year: req.body.year
    });

    if (!book) {
        res.status(400).send("Book not created")
    }
    res.json({
        id: book.id,
        name: book.name,
        author: {
            id: author.id,
            name: author.name
        },
        year: book.year,
        createdAt: book.createdAt
    })
}