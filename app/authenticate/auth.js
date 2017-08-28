var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var router = express.Router();
var User = require('../models/user');


passport.use(new LocalStrategy({
  usernameField: 'userName',
    passwordField: 'password'
},
  function(username, password, done) {
    User.findOne({ 'userName':username, 'password':password}, function(err, user) {
      if (err) {
         return done(err);
        }
        if (!user) {
          return done(null, false);
        }
      return done(null, user);

    });
  }
));

 passport.serializeUser(function(user, done) {
   done(null, user.id);
 });

 passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
 });


var authUser = function(req,res){
  User.findOne({'email': req.body.email} , function(err,data){
    if(err){
      res.json(err);
    }else{
      res.json(data);
    }
  });
};

var login = function(req,res,next){
  passport.authenticate('local',
    function(err,user,info) {
      if(err) {
        res.json(err);
        return;
      }

      if(!user){
        return res.status(401).send({
          message:'Error'
        });
      }

      req.login(user,function(err){
        if(err){
          return next(err);
        }

        res.status(200).send({
          user:user
        });
      })
  })(req,res,next);
};

var isLoggedIn = function(req,res,next){
  if(!req.isAuthenticated()){
   res.status(401).send({
    message : 'Please Login'
   })
  }
   next();
}

var logout =  function(req, res){
      req.logout();
      res.status(200).json({
          success: true,
          message: 'Log out successfully!!!!'
      });
    };


module.exports= {
  passport : passport,
  authUser : authUser,
  login : login,
  logout : logout,
  isLoggedIn : isLoggedIn
};
