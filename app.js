const dotenv = require("dotenv");
const dotenvExpand = require('dotenv-expand');

const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// environment vars
const myEnv = dotenv.config({ path: "./geo.env" });
dotenvExpand.expand(myEnv);


// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main page
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// blog posts
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// GEO
const geoRouter = require('./routes/geo');
app.use('/geo', geoRouter);


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
