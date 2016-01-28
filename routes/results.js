var express = require('express');
var router = express.Router();
var StudentData = require('../models/StudentData');

// Display all students and their results for the teacher that is logged in
router.get('/', function(req, res, next) {
  StudentData.find({teacherUsername: req.user.username}, function(err, studentDatum){
    console.log('got the student Datum');
    console.log("studentDatum", studentDatum);
    // for (var i=0; i<studentDatum.length; i++) {
    //   console.log("i: ", i, " teacherUsername: ", studentDatum[i].teacherUsername, " studentUsername: ", studentDatum[i].studentUsername);
    // }
    res.render('results', { students: studentDatum, user: req.user } );
  });
});

// API style: Get results in JSON format
router.get('/json', function(req, res, next) {
    StudentData.find({teacherUsername: req.user.username}, function(err, studentDatum){
      console.log('got the student Datum');
      // console.log("studentDatum", studentDatum);
      for (var i=0; i<studentDatum.length; i++) {
        console.log("i: ", i, " teacherUsername: ", studentDatum[i].teacherUsername, " studentUsername: ", studentDatum[i].studentUsername);
      }
      console.log("studentDatum[0]")
      res.json(studentDatum);
      // res.render('results', {user: req.user});
    });

});

// Store results from a completed game
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

  // Repackage to into GameResult Model
  var gameResult = {};
  gameResult.cards = [];
  var noteResult = {};
  for (var key in incomingData.cards) {
    console.log(key);
    noteResult={};
    noteResult.letter = key;
    noteResult.wrong_count = incomingData.cards[key];
    console.log('noteResult: ', noteResult);
    gameResult.cards.push(noteResult);
  }

  gameResult.date = Date.now();
  console.log('going to append gameResult: ', gameResult);

  // Find the StudentData Object and push the assmbled data
  // from above onto the Student Data Games array
  StudentData.findOneAndUpdate({
          studentUsername: incomingData.studentUsername
        },
        {}, // no updates.  hehe cool trick!
        // append and save in callback
        function(err, studentData) {
          if (err) return (next(err));
          console.log('---pushing---');
          studentData.games.push(gameResult);
          studentData.save();
          res.send('yo');
        });
});

module.exports = router;
