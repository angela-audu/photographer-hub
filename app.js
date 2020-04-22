const express = require('express');
const helmet = require('helmet');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const validator = require ('express-validator');
const passport = require('passport');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const app = express();
app.use(express.json());

   
//passport config
require('./config/passport')(passport);

//DB CONFIG
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true })
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.use(helmet());

//EJS
app.use(expressLayouts);


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

app.post("/contact",(req, res) => {
    var myData = new Contact(req.body);
    myData.save()
        .then(item => {
            res.send("your message has been sent");
        })
        .catch(err => {
            res.status(400).send("something went wrong");
        });
          

          });

//Bodyparser
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
 //Connect flash
 app.use(flash());
// passport middleware
app.use(passport.initialize());
app.use(passport.session());



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