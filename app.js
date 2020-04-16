const express = require('express');
const helmet = require('helmet');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
//import Recaptcha from 'express-recaptcha'
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
        if (
            req.body.captcha === undefined ||
            req.body.captcha ==='' ||
            req.body.captcha === null
        )
        {
            return res.json ({"success": false, "msg": "please select captcha"});
        }

//secret key
const secretKey = '6LesMeoUAAAAAKhWsG2uoSrg-WKzFeK6szHo1dKI';

//verify url
const verifyUrl= `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

//make request to verify url
request(verifyUrl, (err, response, body) => {
body = JSON.parse(body);

//if not successful
if (body.success !==undefined && !body.success){
    return res.json ({"success": false, "msg": "failed captcha verification"});
}

// if success
return res.json ({"success": true, "msg": "your message has been sent"});

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