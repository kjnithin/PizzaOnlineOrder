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



module.exports= passport;
