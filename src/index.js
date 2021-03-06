require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const logger = require('morgan');

// Enviroment variables
const PORT = process.env.PORT || 1337;
const ENV = process.env.NODE_ENV;

// App instance
const app = express();

// Routes
const routes = require('./routes');

// error handlers
// development error handler
// will print stacktrace
if (ENV === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err
    })
    next()
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err,
    error: {}
  });
});

// Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/v1', routes);

app.listen(PORT, () => console.log(`env: ${ENV}, Listening on ${PORT}`));

module.exports = app;