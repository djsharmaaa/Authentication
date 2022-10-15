
// for log in 
module.exports.login = function(req,res){
        if(req.isAuthenticated()){
            return res.render('loggedin');
        }
        else{
            return res.render('signin');
        }
    }

    
// for sign up
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.render('loggedin');
    }
    else{
        return res.render('signup');
    }
}


// for sign in
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.render('loggedin');
    }
    else{
        return res.render('signin');
    }
}




// for log out
module.exports.logout = function(req,res){
    req.flash('Success', 'logged-out')
    req.logout();
    return res.render('signin');
    
}

//for reset password

module.exports.resetPassword =  function(req,res){
    return res.redirect('./resetPassword');
}



module.exports.createSession =  function(req,res){
    return res.redirect('./signin');
}






// // module.exports.actionName = function(req, res){}