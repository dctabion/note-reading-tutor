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

var siteData = {
  title: 'Flash Notes!!!'
};

router.get('/', function(req, res, next) {
  console.log('inside /account/!!')
  console.log('req.session');
  console.log(req.session);
  console.log('req.user:' + req.user);
  res.send('account');  // TODO fix this
});

router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
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

    console.log('account: ' + account);
    // User is registered at this point

    // authenticate if it is teacher
    if (account.isTeacher) {
      console.log('It is a teacher...authenticating!');
      passport.authenticate('local')(req, res, function(){
        console.log('req.user: ' + req.user);
        res.redirect('/teacher');
      });
    }
    else {
      res.redirect('/teacher');
    }
  });
});

router.get('/add-student', function(req, res){
  res.render('add-student', {user: req.user});
});

router.get('/modify', function(req, res){
  res.response('asdf');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.user);
    console.log('logged in...redirecting to /');
    if (req.user.isTeacher == true)
    {
      console.log('A teacher is logging in!');
      res.redirect('/teacher');
    }
    else
    {
      console.log('A student is logging in!');
      res.redirect('/');
    }
  }
);



router.get('/logout', function(req, res){
  console.log('trying to logout');
  req.logout();
  res.redirect('/');
});

module.exports = router;
