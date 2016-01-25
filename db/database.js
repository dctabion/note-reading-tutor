// require('dotenv').load();

var mongoose
var mongoose = require('mongoose');
var connectionString = "mongodb://localhost/flashNotes"
// var connectionString = process.env.DATABASE_URL;

// define connection string.  'production' will be set if deployed on heroku
// if(process.env.NODE_ENV === 'production'){
//   connectionString = process.env.MONGOLAB_URI;
// }

// alternate way to define string as in class
// var connectionString = process.env.DATABASE_URL || process.env.MONGOLAB_URI;

// console.log("-------------------------------Attempting to connect to Database");
// console.log('process.evn.MOGOLAB_URI: ' + process.env.MONGOLAB_URI);
// console.log('connection string: ' + connectionString);

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log("Connected to Database --> flashNotes");
});

mongoose.connection.on('disconnected', function() {
  console.log("Disconneced From Database >> flashNotes")
});

mongoose.connection.on('error', function() {
  console.log('There was an error connecting to the database! ' + error);
});
