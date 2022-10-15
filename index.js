                     
const express=require('express');   
const cookieParser = require('cookie-parser');

const app=express();
const port = process.env.PORT || 7000; 


// for database
const db=require('./config/mongoose');
const user=require('./models/user');

// for passport authentication
const passport=require('passport');
const passportLocalStrategy=require('./config/passport-local');

const session=require('express-session');
const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());

app.use(cookieParser());
  

// for layouts
const layouts=require('express-ejs-layouts');
app.use(layouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//for static files
app.use(express.static('./assets'));


const path=require('path');
// set up the view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));



app.use(session({
    name:'Authentication',
    secret:'Dheeraj',
    saveUninitialized:false,
    resave:false,
    cookie:{
    maxAge:(1000*60*60)
    },
    store:(new MongoStore({
      mongooseConnection : db,
      autoRemove : 'disabled'
    },
    function(err){
        console.log(err || "connect-mongodb") 
    }))
 }));
  
 
app.use(passport.initialize());
app.use(passport.session());





//use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
