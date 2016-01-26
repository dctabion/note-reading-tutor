var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var GameResultSchema = new mongoose.Schema({
  cards: [{ letter: String, wrong_count: Number }],
  date: { type: Date, default: Date.now }
});

var StudentDataSchema = new mongoose.Schema({
  teacherID: String,
  studentID: String,
  games: [GameResultSchema]
});

var AccountSchema = new mongoose.Schema({
  username: String, // required names for passport .. check DB to see what is actually saved!
  password: String, // required names for passport .. check DB to see what is actually saved!
  email: String,
  firstName: String,
  lastName: String,
  isTeacher: Boolean
  // studentDataIDs: [Number]
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('GameResult', GameResultSchema);
module.exports = mongoose.model('StudentData', StudentDataSchema);
module.exports = mongoose.model('Account', AccountSchema);
