var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

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

module.exports = mongoose.model('Account', AccountSchema);
