var express = require('express');
var router = express.Router();
var StudentData = require('../models/StudentData');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('results', {user: req.user});
});

router.post('/store', function(req, res) {
  console.log('Got a new game to store!');
  console.log(req.body)
});

module.exports = router;
