const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback:true
    },
    function(req,Email, password, done){
        // find a user and establish the identity
        User.findOne({email: Email}, function(err, User)  {
            if (err){
                return done(err);
            }

            if (!User || User.password != password){
                req.flash('Invalid Username/Password');
                return done(null, false);
            }
            else{
                req.flash('success','you are logged in');
             return done(null,User);
            }

            
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(User, done){
    done(null, User.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, User){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/login');
}

passport.setUserToLocals = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;
