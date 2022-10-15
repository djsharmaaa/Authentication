// module.exports.profile = function(req, res){
//         res.end('<h1> profle </h1>');
// }

const user = require('../models/user');


//for reseting the password

module.exports.passwordreset = function(req, res) {
        user.findById(req.user._id, function(err, User){
                if(err){
                        console.log('error in resetting the password');
                        return;
                        if(User.password == req.body.oldpasssword && req.body.password == req.body.confirmpassword)
                        {
                                User.password = req.body.password;
                                User.save();
                                req.flash('sucess', 'passowrd succesfully changed');
                                return res.redirect('/restpassword');
                        }else{
                                req.flash('error','password not changed');
                                return res.redirect('/resetpassword')
                        }
                }
        });
}