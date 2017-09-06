var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('dotenv').config({ path: 'variables.env' });
require('./db.js');

var routes = require('./app/routes/index');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(validator());
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname +'/client'));
app.use(express.static(__dirname +'/dist'));


app.get('/', function(req, res) {
  res.sendFile(__dirname+"/client/index.html");
});

app.use('/',routes);


app.listen(process.env.PORT);
console.log("The Magic is happening on port " + process.env.PORT);
