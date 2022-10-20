const nodeMailer =  require('../config/node-mailer');

module.exports.forgetPassword = function(email, TOKEN){

    nodeMailer.transporter.sendMail({
        from: 'dheeraj.badalsharma@gmail.com',
        to: email,
        subject: "forgot Password",
        html: 'http://localhost:7000/users/newpasword/?token=${TOKEN}'
    },
    function(err, info){
        if(err)
        {console.log("error in sending mail", err);return;}
        console.log("message sent", info);
        return;
    });
}