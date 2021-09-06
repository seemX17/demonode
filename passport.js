const passport = require("passport")
const config = require("./config")

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

//jwt options
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
opts.secretOrKey = config.secret;

var strategy = new JwtStrategy(opts, function (jwt_payload, next) {
    console.log("payload received", jwt_payload);
    // usually this would be a database call:

    next(null, {
        id: 3
    })

    // models.user
    //   .findOne({
    //     where: {
    //       id: jwt_payload.id
    //     }
    //   })
    //   .then(user => {
    //     if (user) {
    //       next(null, user);
    //     } else {
    //       next(null, false);
    //     }
    //   });
});

passport.use(strategy);


module.exports = passport;