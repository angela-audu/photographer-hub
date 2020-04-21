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
      name: req.user.name}
      ));
//gallery
router.get('/samuel', ensureAuthenticated, (req, res) => 
  res.render('samuel', {
      name: req.user.name}
      ));

      router.get('/mary', ensureAuthenticated, (req, res) => 
  res.render('mary', {
      name: req.user.name}
      ));
      router.get('/remi', ensureAuthenticated, (req, res) => 
  res.render('remi', {
      name: req.user.name}
      ));
      router.get('/slayer', ensureAuthenticated, (req, res) => 
  res.render('slayer', {
      name: req.user.name}
      ));
       // Get contact 
       router.get('/contact', (req, res) => {
        res.render('contact', {
          data: {},
          errors: {}
        });
      });
       
module.exports = router;

