var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51IjaarKYqd7ERY9f4JdFCN0x22mzaZb78w5NfZVOoqUN60fpQw2iTrcT3vmBmpvQrFOVYNy41rGBeIiv7NTyrqju00XTBgry9o");

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

mongoose.connect('mongodb://localhost/shopping', { useNewUrlParser: true, useUnifiedTopology: true });
require('./config/passport');


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }), 
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

const calculateOrderAmount = items => {
  console.log(items);
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.session.cart;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "sek"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.use('/user', userRouter);
app.use('/', indexRouter);

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
