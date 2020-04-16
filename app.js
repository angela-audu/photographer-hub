const express = require('express');
const helmet = require('helmet');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
var Recaptcha = require('express-recaptcha').RecaptchaV3;
//import Recaptcha from 'express-recaptcha'
var recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY');
//passport config
require('./config/passport')(passport);

//DB CONFIG
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true })
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.use(helmet());
//EJS
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', recaptcha.middleware.render, function(req, res){
    res.render('login', { captcha:res.recaptcha });
  });

mongoose.Promise = global.Promise;
mongoose.connect
var ContactSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email2: String,
    subject: String
});
var Contact = mongoose.model("Contact", ContactSchema);

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save()
        .then(item => {
            res.send("your message has been sent");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

//Bodyparser
app.use(express.urlencoded({ extended: false}));



// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
    //Connect flash
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('Server started on port 3000'));