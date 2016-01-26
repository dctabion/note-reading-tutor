var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('inside /teacher!!')
  console.log('req.user: ' + req.user);
  res.render('teacher', {user: req.user});
  // res.render('teacher', siteData);
});

module.exports = router;
