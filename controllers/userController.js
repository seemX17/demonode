const {
    UpdateUser
} = require("../actions/userActions/update");

class UserController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async update() {
        await UpdateUser(this.req, this.res)
    }
}

module.exports.UserController = {
    update: async (req, res) => {
        await new UserController(req, res).update();
    }
}