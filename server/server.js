var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');
var passport = require('passport');
var flash    = require('connect-flash');
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
var auth = require('./auth/routes').router(passport);
var cors = require('cors');
var multer = require('multer');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// db.url is different depending on NODE_ENV
mongoose.connect(config.db.url, {
  useMongoClient: true,
});

logger.log('connected to database - ' + config.db.url);
require('./auth/passport')(passport); // pass passport for configuration

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// require('./passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended:false }));
app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)
// app.use(express.static(path.join(__dirname,'public')));
app.use(session({
  secret: config.secret,
  saveUninitialized: false,
  resave: false
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// if (config.seed) {
//   require('./util/seeder');
// }
// setup the app middlware
// require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', api);
app.use('/auth', auth);
// set up global error handling

app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send(err.message);
});

// export the app for testing
module.exports = app;