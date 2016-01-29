var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/Account');
var StudentData = require('../models/StudentData');
var router = express.Router();
var colors = require('colors');


// configure passport
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// end configuration for passport

var siteData = {
  title: 'Flash Notes!'
};

router.get('/', function(req, res, next) {
  console.log('inside /account/!!'.green)
  console.log('req.session');
  console.log(req.session);
  console.log('req.user:' + req.user);
  res.send('account');  // TODO fix this
});

router.get('/register', function(req, res){
    console.log(siteData);
    // TODO this is a temp fix.
    siteData = {};
    siteData.title = "Flash Notes!"
    res.render('register', siteData);
});

router.post('/register', function(req, res){
  console.log('in POST /register-------------------------');
  var newUserInfo = req.body;
  console.log("newUserInfo.isTeacher: ", newUserInfo.isTeacher);
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
      console.log("newUserInfo.isTeacher: ", newUserInfo.isTeacher);
      // TODO status message...you had a problem registering
      if (newUserInfo.isTeacher==true) {
        console.log('teacherReg failed!', err);
        return res.redirect('register');
      }
      else if (newUserInfo.isTeacher==false) {
        console.log('studentReg failed!', err);
        return res.redirect('add-student');
      }
    }
    // User is registered at this point
    // account will hold user that was added
    console.log('account:',  account);

    // authenticate if it is teacher
    if (account.isTeacher) {
      console.log('It is a teacher...authenticating!');
      passport.authenticate('local')(req, res, function(){
        console.log('req.user: ' + req.user);
        res.redirect('/results');
      });
    }
    else {
      // it is a student
      // assemble a student data object to hold completed games result
      // and store in the database
      var studentData = {};
      studentData.teacherUsername = req.user.username;
      studentData.studentUsername = account.username;
      studentData.firstName = account.firstName;
      studentData.lastName = account.lastName;
      studentData.games = [];
      console.log('assembled studentData:');
      console.log(studentData);
      StudentData.create(studentData, function(err, data){
        console.log('stored to mongo: ' + data);
      });
      res.redirect('/results');
    }
  });
});

router.get('/add-student', function(req, res){
  siteData.user = req.user;
  res.render('add-student', siteData);
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
      res.redirect('/results');
    }
    else
    {
      console.log('A student is logging in!');
      res.redirect('/game');
    }
  }
);



router.get('/logout', function(req, res){
  console.log('trying to logout');
  req.logout();
  res.redirect('/');
});

module.exports = router;
