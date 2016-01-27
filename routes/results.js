var express = require('express');
var router = express.Router();
var StudentData = require('../models/StudentData');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('results', {user: req.user});
});

router.post('/store', function(req, res) {
  console.log('Got a new game to store!  req.body:');
  // For some reason, the JSON sent from client is the key in an object with one key-value pair.
  // The value is an empty stringify
  // So we need to extract the key and parse that!
  // Parse data into object
  var keys = Object.keys(req.body);
  console.log('Object.keys(req.body):' + keys);
  var incomingData = JSON.parse(keys[0]);
  console.log('incomingData: ');
  console.log(incomingData);

  // Repackage to match GameResult Model
  var gameResult = {};
  gameResult.cards = incomingData.cards;
  gameResult.date = Date.now();
  console.log('going to append gameResult: ', gameResult);

  // var studentData = StudentData.find({studenUsername: gameResults.studentUser});
  StudentData.findOneAndUpdate({
          studentID: incomingData.studentID
        },
        {}, // no updates.  hehe cool trick!
        // append and save in callback
        function(err, studentData) {
          if (err) return (next(err));
          console.log('---pushing---');
          studentData.games.push(gameResult);
          console.log('studentData after update: ', studentData);
          studentData.save();
          res.send('yo');
        });
});

module.exports = router;
