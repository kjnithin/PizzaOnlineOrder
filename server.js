var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var auth = require('./app/authenticate/auth');
var userController = require('./app/controllers/userController');
var provinceController = require('./app/controllers/provinceController');
var sizeController = require('./app/controllers/sizeController');
var crustController = require('./app/controllers/crustController');
var cheeseController = require('./app/controllers/cheeseController');
var toppingController = require('./app/controllers/toppingController');

mongoose.set('debug', true);
var options = { promiseLibrary: require('bluebird') };
mongoose.connect('mongodb://user:admin123@ds129030.mlab.com:29030/heroku_3thhq152',options);
mongoose.connection.on('error', function(err) {
    console.log(err);
});

// mongoose.set('debug', true);
// var options = { promiseLibrary: require('bluebird') };
// mongoose.connect('mongodb://user:admin123@ds033317.mlab.com:33317/tutoraildb',options);
// mongoose.connection.on('error', function(err) {
//     console.log(err);
// });


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(validator());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname +'/client'));
// app.use(express.static(__dirname +'/dist'));


app.get('/', function(req, res) {
  res.sendFile(__dirname+"/client/index.html");
});

// Login using local authentication
app.post('/login', passport.authenticate('local'),
    function(req,res) {
        res.status(200).send({
          user:req.user
        });
      });

// Logout using local authentication
app.get('/logout', function(req, res){
      req.logout();
      res.status(200).json({
          success: true,
          message: 'Log out successfully!!!!'
      });
    });


app.get('/users', userController.getUser);
app.post('/users', userController.postUser);
app.get('/users/:user_id', userController.getidUser);
app.put('/users/:user_id', userController.putUser);
app.delete('/users/:user_id', userController.deleteUser);

app.post('/auth', auth.authUser);

app.get('/provinces', provinceController.getProvince);
app.post('/provinces', provinceController.postProvince);
app.get('/provinces/:province_id', provinceController.getidProvince);
app.put('/provinces/:province_id', provinceController.putProvince);
app.delete('/provinces/:province_id', provinceController.deleteProvince);

app.get('/sizes', sizeController.getSize);
app.post('/sizes', sizeController.postSize);
app.get('/sizes/:size_id', sizeController.getidSize);
app.put('/sizes/:size_id', sizeController.putSize);
app.delete('/sizes/:size_id', sizeController.deleteSize);

app.get('/crusts', crustController.getCrust);
app.post('/crusts', crustController.postCrust);
app.get('/crusts/:crust_id', crustController.getidCrust);
app.put('/crusts/:crust_id', crustController.putCrust);
app.delete('/crusts/:crust_id', crustController.deleteCrust);

app.get('/cheeses', cheeseController.getCheese);
app.post('/cheeses', cheeseController.postCheese);
app.get('/cheeses/:cheese_id', cheeseController.getidCheese);
app.put('/cheeses/:cheese_id', cheeseController.putCheese);
app.delete('/cheeses/:cheese_id', cheeseController.deleteCheese);

app.get('/toppings', toppingController.getTopping);
app.post('/toppings', toppingController.postTopping);
app.get('/toppings/:topping_id', toppingController.getidTopping);
app.put('/toppings/:topping_id', toppingController.putTopping);
app.delete('/toppings/:topping_id', toppingController.deleteTopping);


var port = process.env.PORT || 3000;

app.listen(port);
console.log("The Magic is happening on port " + port);
