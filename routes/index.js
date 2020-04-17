const express =require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const bodyParser = require('body-parser');
const middlewares = [
  // ...
  bodyParser.urlencoded({ extended: true }),
];
// welcome page
router.get('/', (req, res) => res.render('home'));

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
  res.render('dashboard', {
      user: req.user}
      ));

       // Get contact 
       router.get('/contact', (req, res) => {
        res.render('contact', {
          data: {},
          errors: {}
        });
      });
      
      router.post('/contact', (req, res) => {
        res.render('contact', {
          data: req.body, // { message, email }
          errors: {
            message: {
              msg: 'A message is required'
            },
            email: {
              msg: 'That email doesn‘t look right'
            }
          }
        });
      });
 
module.exports = router;

