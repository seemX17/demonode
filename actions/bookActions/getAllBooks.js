const models = require("../../models");

module.exports.GetAllBooks = async (req, res) => {

    let books = await models.books.findAll({
        include: [{
            model: models.users,
            attributes: [
                'id',
                'name'
            ],
            as: 'author'
        }]
    });

    let list = books.map((book) => {
        return {
            id: book.id,
            name: book.name,
            author: {
                id: book.author.id,
                name: book.author.name
            },
            year: book.year,
            createdAt: book.createdAt
        }
    })
    res.json(list)
}