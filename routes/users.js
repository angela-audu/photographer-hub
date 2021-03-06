const express =require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

//Login page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

//Register page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Register Handle
router.post ('/register', (req, res) => {
   const { name, email, password, password2} = req.body;
   let errors = [];

   // Check required fields
   if(!name || !email || !password  || !password2 ){
       errors.push({msg: 'Please fill in all fields'});
   }

   //Check Password match
   if(password !== password2) {
       errors.push({ msg: 'Password is not the same'});
   }
   
   //Check password length
if(password.length <6){
    errors.push({ msg: 'Password too short'});
}
   
   if(errors.length > 0) {
       res.render('register', {
           errors,
           name,
           email,
           password,
           password2
       });

   } else { 
       // Validation passed
       User.findOne({ email: email})
       .then(user => {
           if(user) {
               //User exists
               errors.push({ msg: 'Email is already registered'});
               res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            });     
}   else {
    const newUser = new User({
        name,
        email,
        password
    });
    // Hash password
    bcrypt.genSalt(10, (err, salt) => 
        bcrypt.hash(newUser.password, salt, (err, hash) =>{ 
            if(err) throw err;

            // Set Password to hashed
            newUser.password = hash;

            //Save user
            newUser.save()
            .then(user => {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        }))
}

});
}
});

//login handle
router.post('/login', (req, res, next) => {
    req.session.email = req.body.email;
	req.session.password = req.body.pass;
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);

    

});


// logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
    req.session.destroy();    	

		
});
module.exports = router;

