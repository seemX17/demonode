const {
    CreateBook
} = require('../actions/bookActions/createBook');
const {
    GetAllBooks
} = require('../actions/bookActions/getAllBooks');

class BookController {
    constructor(req, res) {
        this.req = req,
            this.res = res
    }

    async create() {
        await CreateBook(this.req, this.res)
    }
    async getAll() {
        await GetAllBooks(this.req, this.res)
    }
}

module.exports.BookController = {
    create: async (req, res) => {
        await new BookController(req, res).create()
    },
    getAll: async (req, res) => {
        await new BookController(req, res).getAll()
    },
}