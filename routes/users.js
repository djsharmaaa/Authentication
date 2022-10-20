const express = require('express');
const router = express.Router();

const passport = require('passport');

const users = require('../controllers/users_controllers');


router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),require('../controllers/Home_controllers').createSession);


router.post('/passwordreset', users.passwordreset)
router.get('/forgotpage', users.forgotpage);
router.get('/newpassword',users.newpassword);
router.post('/sendlink', users.sendlink);

router.post('/mail', users.resetThroughMail);


module.exports = router;