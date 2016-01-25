var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var GameResultSchema = new mongoose.Schema({
  cards: [{ letter: String, wrong_count: Number }],
  date: { type: Date, default: Date.now }
});

var StudentDataSchema = new mongoose.Schema({
  teacherUsername: String,
  username: String,
  games: [GameResultSchema]
});

var AccountSchema = new mongoose.Schema({
  username: String, // required names for passport .. check DB to see what is actually saved!
  password: String, // required names for passport .. check DB to see what is actually saved!
  email: String,
  firstName: String,
  lastname: String,
  isTeacher: Boolean,
  students: [StudentDataSchema]  // Will use this if a teacher
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('GameResult', GameResultSchema);
module.exports = mongoose.model('StudentData', StudentDataSchema);
module.exports = mongoose.model('Account', AccountSchema);
