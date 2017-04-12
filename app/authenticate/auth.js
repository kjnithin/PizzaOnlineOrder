var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
module.exports= {
  passport : passport,
  authUser : authUser
};
