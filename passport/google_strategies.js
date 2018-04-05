var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: "386950652321-7qcs3fhaa8u75iqb16shlv57vns58dsm.apps.googleusercontent.com",
        clientSecret: "0Xt1MDjYpdMgVs5hykKhkIP0",
        callbackURL: "http://localhost:2400/user/home"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
exports=module.exports=passport