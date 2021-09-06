const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config")


const authRoutes = (app, passport) => {
    app.post('/auth/login',
        async (request, response) => {


            var jwtPayload = {
                id: 2,
                email: "simxec@gmail.com"
            }

            let token = jwt.sign(jwtPayload, config.secret)

            response.send(token)


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
}

module.exports.authRoutes = authRoutes;