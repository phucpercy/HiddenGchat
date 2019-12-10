var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');

/*//Database Connection//
var userDatabase = mongoose.connection;
userDatabase.on('error', console.error.bind(console, 'MongoDB connection failed'));
var mongoDB = 'mongodb+srv://phucpercy:<ptphuc15699>@webchat-tzbww.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});*/

//Local database test//
var userDatabase = 'mongodb://localhost:27017/userDatabase';
mongoose.connect(userDatabase, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Database connection error"));

//Using passport
require('./config/passport')(passport);

//Declare Router//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
//app.engine('ejs', require('ejs'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Config for passport
app.use(session({
  secret:'secured_key',
  resave: false,
  saveUninitialized: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport Config//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'secured-key',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/*app.use('/', indexRouter);
app.use('/users', usersRouter);*/
require('./routes/routes')(app, passport);
app.listen('3000');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
