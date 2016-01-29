var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

var siteData = {
  title: 'Flash Notes!',
};
/* GET home page. */
router.get('/', function(req, res, next) {
  siteData.user = req.user;
  siteData.noUserMsg = 'Enjoy playing Flash Notes!';

  res.render('index', siteData);
});

router.get('/game', function(req, res, next) {
  siteData.user = req.user;
  siteData.noUserMsg = 'Login to report your results!';
  res.render('game', siteData);
});

module.exports = router;
