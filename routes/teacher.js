var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('inside account/!!')
  res.render('teacher', {user: req.user});  // TODO fix this
});

module.exports = router;
