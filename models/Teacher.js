var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  cards: [{ letter: String, wrong_count: Number }],
  date: { type: Date, default: Date.now }
});

var StudentSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  games: [GameSchema]
});

var TeacherSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  students: [StudentSchema]
});
