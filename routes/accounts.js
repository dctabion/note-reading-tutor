var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/Models');
var router = express.Router();

// configure passport
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// end configuration for passport

router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});  // TODO fix this
});

router.get('/register', function(req, res){
    res.render('register');
});

router.get('/logout', function(req, res){
    res.logout();
    res.redirect('/');
});

router.post('/register', function(req, res) {
  Account.register(new Account({
    username : req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isTeacher: req.body.isTeacher
  }),
  req.body.password,
  function(err, account) {
    if (err) {
      // TODO status message...you had a problem registering
      return res.render('/', { account: account});
    }
    // User is registered at this point
    passport.authenticate('local')(req, res, function(){
      console.log('registered & authenticated. going to redirect to /');
      res.redirect('/');
    });
  });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.post('/logout', function(){
  req.logout();
  res.redirect('/');
});

module.exports = router;
