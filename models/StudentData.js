var mongoose = require('mongoose');

// var CardSchema = new mongoose.Schema({
//   letter: String,
//   wrong_count: Number
// });

var GameResultSchema = new mongoose.Schema({
  cards: [ {letter: String, wrong_count: Number} ],
  date: { type: Date, default: Date.now }
});

var StudentDataSchema = new mongoose.Schema({
  teacherUsername: String,
  studentUsername: String,
  games: [GameResultSchema]
});

// module.exports = mongoose.model('CardSchema', CardSchema);
module.exports = mongoose.model('GameResult', GameResultSchema);
module.exports = mongoose.model('StudentData', StudentDataSchema);
