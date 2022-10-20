const user = require('../models/user');
 

//creating a session or user

module.exports.createUser = function(req,res){
        
        user.findOne({email:req.body.email},function(err,User){
        
        if(User){
                req.flash('error','Email already exists');
                return res.redirect('back');
              }
              else if(req.body.password!==req.body.confirmpassword){
              req.flash('error','password and confirm password are not same');
                return res.redirect('back');
              }else{
                user.create(req.body,function(err,User){});
                req.flash('success','Account created');
                return res.redirect('/signin');
              }
               
            
            });
        

        }