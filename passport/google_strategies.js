var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const google=require('../config').google
const User=require('../db/models').User
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: google.clientId,
        clientSecret: google.clientSecret,
        callbackURL: "http://localhost:8888/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        console.log(profile)
        User.findOne({where:{googleId:profile.id}})
            .then((user)=>{
                if(user)
                {
                    done(null,user)
                }
                else
                {
                    profile['email']=profile.displayName+'@gmail.com'
                    User.create({
                        username:profile.displayName,
                        googleId:profile.id,
                        email:profile.email
                    })
                        .then((user)=>{
                            console.log(user)
                            done(null,user)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                }

            })
            .catch((err)=>{
                console.log(err)
            })
    }
));
exports=module.exports=passport