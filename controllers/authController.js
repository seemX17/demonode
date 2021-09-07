const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const {
    Login
} = require("../actions/authActions/login");

class AuthController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async login() {
        Login(this.req, this.res)
    }

    async validate() {
        this.res.send("success")
    }

    async signup() {
        let name = this.req.body['name'];
        let pass = this.req.body['password'];
        let email = this.req.body['email'];
        let user = await models.users.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            this.res.status(400).send("User already exist!")
            return;
        }
        user = await models.users.create({
            name,
            password: await bcrypt.hash(pass, 10),
            email
        });

        if (!user) {
            this.res.status(400);
        }

        this.res.json({
            name: user.name,
            //password: user.password,
            email: user.email,
            createdAt: user.createdAt
        })
    }
}

module.exports.AuthController = {
    login: async (req, res) => {
        await new AuthController(req, res).login()
    },
    signup: async (req, res) => {
        await new AuthController(req, res).signup()
    },
    validate: async (req, res) => {
        await new AuthController(req, res).validate()
    }
};