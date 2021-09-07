const models = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports.Login = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body)
    let user = await models.users.findOne({
        where: {
            email: username,
        }
    });
    if (!user) {
        res.status(404).send("User doesn't exist!");
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(400).send("Incorrect password!");
    }

    var jwtPayload = {
        id: user.id,
        email: user.email
    }
    let token = jwt.sign(jwtPayload, config.secret)
    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    })
}