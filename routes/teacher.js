var express = require('express');
var router = express.Router();

var siteData = {
  title: 'Flash Notes!',
};

router.get('/', function(req, res, next) {
  console.log('inside /teacher!!')
  console.log('req.user: ' + req.user);
  siteData.user = req.user;
  res.render('teacher', siteData);
  // res.render('teacher', siteData);
});

module.exports = router;
