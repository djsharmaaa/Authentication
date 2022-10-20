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
                }
                if(User.password == req.body.oldpasssword && req.body.password == req.body.confirmpassword)
                {
                        User.password = req.body.password;
                        User.save();
                        req.flash('sucess', 'passowrd succesfully changed');
                        return res.redirect('/resetPassword');
                }else{
                        req.flash('error','password not changed');
                        return res.redirect('/resetPassword');
                }
        
                     
        });
}


// module.exports.forgotpage =  funtion(req,res){
//           return res.render('sendlink');
//          }



//send mail on everytime when changing password
const nodemailer = require('../mailer/forgetPassword');
const Token = require('../models/token');
const crypto =  require('crypto');

module.exports.sendlink = async function(req,res){
        let User = await user.findOne({email:req.body.email});
        if (User){
                let hex = crypto.randomBytes(20).tostring('hex');
                let Token  = await TOKEN.create({
                        userid : User._id,
                        token : hex
                });
                setTimeout(function(){
                        Token.remove();

                },120000);

        nodemailer.forgetPassword(re.body.email, TOKEN.token);
        req.flash('sucess', 'link send on the email');
        return res.redirect('back');
        }
        else{
                req.flash('error', 'this email do not exists in the database');
                return res.redirect('back');
        }
}






module.exports.newpassword = function(req,res){
        TOKEN.findOne({token:req.query.token},function(err,Token){
                if(!Token){
                        return res.end('<h1> TOKEN IS EXPIRED </h1>');
                }
                else{
                        return res.render('forgotByMail',{
                                token:Token.token
                        });
                }
        });
}


module.exports.resetThroughMail = function(rq,res){
        TOKEN.findOne({token: req.body.token},function(err,Token){
                user.findOne({_id: Token.userid},function(err,User){
                        if(req.body.passowrd == req.body.confirmpassword)
                        {
                                User.password = req.body.confirmpassword;
                                User.save();
                                req.flash('sucess','password changed');
                                return res.redirect('back');
                        }else{
                                req.flash('error','password and confirm password does not match');
                                return res.redirect('back');
                        }
                });
        });
}
