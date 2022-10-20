const passport = require('passport');

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const user = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"844726428450-aj7cb2c6b2mbtamj700a817dit0v9ha3.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:7000/users/auth/google/callback",

    },

    function(accessToken, refreshToken, profile, done){
        //find user
        user.findOne({email: profile.emails[0].value},function(err, User){
            if(err){
                console.log("error in googleOauth",err); return;
            }

            if(User){
                //if user found, set this user as req.user
                return done(null, User);
            }
            else{
                //if user not fount, create the user and set it as req.user
                user.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20)
                },
                function(err,User){
                    if(err){
                    console.log("error in googleOauth",err); return;
                }
                return done(null, User);
            });
            }
        });   
    }));

    module.exports = passport;