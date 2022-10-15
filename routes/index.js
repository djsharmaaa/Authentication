const express=require('express');
const router=express.Router();
const passport=require('passport');
const homeController = require('../controllers/Home_controllers');

console.log('router loaded');


router.get('/', require('../controllers/Home_controllers').login);
router.get('/signup', require('../controllers/Home_controllers').signup);
router.get('/signin', require('../controllers/Home_controllers').signin);

router.get('/logout', require('../controllers/Home_controllers').logout);
router.get('/resetPassword', require('../controllers/Home_controllers').resetPassword);


// use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), require('../controllers/Home_controllers').createSession);


router.post('/create',require('../controllers/CreateUsers').createUser);

router.use('/users',require('./users'));


module.exports=router;