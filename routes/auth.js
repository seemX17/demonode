const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const models = require("../models");

const authRoutes = (app, passport) => {
    app.post('/auth/login',
        async (request, response) => {

            let username = request.body.username;
            let password = request.body.password;
            console.log(request.body)
            let user = await models.users.findOne({
                where: {
                    email: username,
                }
            });
            if (!user) {
                response.status(404).send("User doesn't exist!");
            }

            if (!(await bcrypt.compare(password, user.password))) {
                response.status(400).send("Incorrect password!");
            }

            var jwtPayload = {
                id: user.id,
                email: user.email
            }
            let token = jwt.sign(jwtPayload, config.secret)
            response.json({
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }
            })


            // console.log(request.body)
            // response.send(request.body)
            // let bodyRes = request.body;
            // bodyRes.password == "testpass" && bodyRes.username == "test" ? response.send(request.body) : response.status(401).send("Wrong username & password")
        });

    app.get("/auth/validate", passport.authenticate("jwt", {
        session: false
    }), async (request, response) => {
        response.send("success")
    })

    app.post("/auth/signup", async (request, response) => {
        let name = request.body['name'];
        let pass = request.body['password'];
        let email = request.body['email'];
        let user = await models.users.create({
            name,
            password: await bcrypt.hash(pass, 10),
            email
        });

        if (!user) {
            response.status(400);
        }
        response.json({
            name: user.name,
            //password: user.password,
            email: user.email,
            createdAt: user.createdAt
        })
    })
}

module.exports.authRoutes = authRoutes;

//POSt GRES
//create database dbname
// \c databasename
// squalize cli, squelize init
// sequelize migration:generate --name create-users
// nodemon