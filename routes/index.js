const express=require('express');
const router=express.Router();
const homeController = require('../controllers/Home_controllers');

console.log('router loaded');


router.get('/', require('../controllers/Home_controllers').login);
router.get('/signup', require('../controllers/Home_controllers').signup);
// router.get('/signin', require('../controllers/Home').signin);

// router.get('/logout', require('../controllers/Home').logout);
// router.get('/resetPassword', require('../controllers/Home').resetPassword);


// router.post('/create',require('../controllers/'))

 router.use('/users',require('./users'));


module.exports=router;