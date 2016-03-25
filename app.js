require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

hbs.registerHelper('colorCodeCount', function(count){
  // beginning of string
  var str = '<td style="text-align: center; background: ';
  // add color coding for wrong_count
  if (count == 0) {
    str += 'green"';
  }
  else if (count == 1) {
    str += 'yellow"';
  }
  else if (count == 2) {
    str += 'orange"';
  }
  else {
    str += 'red"';
  }
  // rest of string
  str += '>' + this.wrong_count + '</td>';

  console.log(str);
  return new hbs.SafeString(str);
});

// Add passport .. before database
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStratgey = require('passport-facebook').Strategy;  // try this sometime
// needs to be available before database

var colors = require('colors');

// DATABASE Connection
var db = require('./db/database');

// ROUTES
var routes = require('./routes/index');
var accounts = require('./routes/accounts');
var teacher = require('./routes/teacher');
var results = require('./routes/results');

var app = express();
// Enable sessions immediately after starting app.
// instantly enable sessions!
app.use(require('express-session')({
  secret: 'the dood has flown.  beware!',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// done enabling sessions

// configure passport
var Account = require('./models/Account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// end configuration for passport

// MODELS
var Account = require('./models/Account');
var StudentData = require('./models/StudentData')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/accounts', accounts);
app.use('/teacher', teacher);
app.use('/results', results);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
