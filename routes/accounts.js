var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/Models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/register', function() {
  Account.register(new Account({ username : req.body.username}), req.body.password, function(err, account) {
    if (err) {
      return res.render('/', { account : account});
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/');
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
