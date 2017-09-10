var User = require('../models/user');
var auth = require('../authenticate/auth');


var validatingUsers = function(req, res, next) {

  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("userName", "User name is required").notEmpty();
  req.checkBody("email", "Enter valid email").isEmail();
  req.checkBody("password", "Password is  required").notEmpty();
  req.checkBody("apt", "Apartment is required").notEmpty();
  req.checkBody("street", "Street name is required").notEmpty();
  req.checkBody("city", "Please enter the city").notEmpty();
  req.checkBody("province", "Province is reequired").notEmpty();
  req.checkBody("postal", "Postal code is required").notEmpty();
  req.checkBody("phone", "Phone number is required").notEmpty();
  req.checkBody("role", "Role number is required").notEmpty();

  var error = req.validationErrors();
  if (error) {
    res.status(401).json(
      error
    );
  } else {
    next();
  }
}

var registerUser = function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err, user) {
    if (err) {
      res.status(400).send({
        success: false,
        message: 'Registration unsuccessful',
        err: err
      })
    } else {
      next();
    }
  });
};


var getUser = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

var getidUser = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

var putUser = function(req, res) {
  User.findOneAndUpdate({
      _id: req.params.user_id
    },
    req.body, {
      new: true,
      runValidators: true
    },
    function(err, user) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({
          success: true,
          message: "updated successfully"
        });
      }
    });
};


var deleteUser = function(req, res) {
  User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'user Deleted'
    });
  });
};



module.exports = {
  validatingUsers: validatingUsers,
  deleteUser: deleteUser,
  putUser: putUser,
  getidUser: getidUser,
  getUser: getUser,
  registerUser: registerUser
};
