const models = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports.Login = async (req, res) => {
    let validation = validateRequest(req.body);
    if (validation) {
        res.status(400).send(validation);
        return;
    }
    const {
        username,
        password
    } = req.body;

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
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }
    })
}

function validateRequest(body) {
    if (!body.username || !body.password) {
        return "missing attribute username/password"
    }
}