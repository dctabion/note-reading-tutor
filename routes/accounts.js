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

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username}), req.body.password, function(err, account) {
    if (err) {
      return res.render('/', { account : account});
    }
    passport.authenticate('local')(req, res, function(){
      res.render('index');
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('POST /login-------------------');
  res.redirect('/');
});

router.post('/logout', function(){
  req.logout();
  res.redirect('/');
});

module.exports = router;
