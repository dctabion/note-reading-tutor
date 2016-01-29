var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

var siteData = {
  title: 'Flash Notes!',
};
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.user');
  console.log(req.user);
  siteData.user = req.user;
  console.log('siteData');
  console.log(siteData);

  res.render('index', siteData);
});

module.exports = router;
