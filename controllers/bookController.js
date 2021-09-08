const {CreateBook} = require('../actions/bookActions/createBook');

class BookController {
    constructor(req, res) {
        this.req = req,
            this.res = res
    }

    async create() {
        await CreateBook(this.req, this.res)
    }
}

module.exports.BookController = {
    create: async (req, res) => {
        await new BookController(req, res).create()
    },
}