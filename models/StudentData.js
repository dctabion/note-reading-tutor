var mongoose = require('mongoose');

var GameResultSchema = new mongoose.Schema({
  cards: [{ letter: String, wrong_count: Number }],
  date: { type: Date, default: Date.now }
});

var StudentDataSchema = new mongoose.Schema({
  teacherUsername: String,
  studentUsername: String,
  games: [GameResultSchema]
});

module.exports = mongoose.model('GameResult', GameResultSchema);
module.exports = mongoose.model('StudentData', StudentDataSchema);
