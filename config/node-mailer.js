const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'dheeraj.badalsharma',
        pass: 'codingninjas'
    }
});