const passport = require("passport")
const config = require("./config")
const models = require("./models");

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

//jwt options
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
opts.secretOrKey = config.secret;

var strategy = new JwtStrategy(opts, function (jwt_payload, next) {
    console.log("payload received", jwt_payload);
    // usually this would be a database call:
    models.users.findOne({
        where: {
            id: jwt_payload.id,
            email: jwt_payload.email
        }
    }).then(user => {
        if (!user) {
            next(null, false)
        }
        next(null, user)
    });




});

passport.use(strategy);


module.exports = passport;