const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./config/routes');

const app = express();

//TODO: Set up seperate database.js file
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://homeward:homeward1234@ds037827.mlab.com:37827/homeward');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './../build/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));

app.use('/api/users', routes.users);
app.use('/api/queries', routes.queries);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
