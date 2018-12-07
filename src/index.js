require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// Enviroment variables
const PORT = process.env.PORT || 1337;
const ENV = process.env.NODE_ENV;

// App instance
const app = express();

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
