var User = require('../models/user');

var getUser = function(req,res) {
   User.find(function(err, users) {
        if(err)
          res.send(err);

        res.json(users);
      });
    };


var postUser = function(req,res) {
          var user = new User(req.body);

          req.checkBody("name","Name is required").notEmpty();
          req.checkBody("userName","User name is required").notEmpty();
          req.checkBody("email","Enter valid email").isEmail();
          req.checkBody("password","Password is  required").notEmpty();
          req.checkBody("apt","Apartment is required").notEmpty();
          req.checkBody("street","Street name is required").notEmpty();
          req.checkBody("city","Please enter the city").notEmpty();
          req.checkBody("province","Province is reequired").notEmpty();
          req.checkBody("postal","Postal code is required").notEmpty();
          req.checkBody("phone","Phone number is required").notEmpty();
          req.checkBody("role","Role number is required").notEmpty();

          var error = req.validationErrors();
          if (error) {
          res.status(401).json({error});
       }
       else{
         user.save(function(err,status){
            if(!err){
             res.status(200).json({
               success:true,
               message:'User created',
             });
           }
         });
       }
     };

var getidUser = function(req,res) {
  User.findById(req.params.user_id, function(err, user) {
         if(err)
           res.send(err);

         res.json(user);
       });
};

var putUser = function(req,res) {
  User.findById(req.params.user_id, function(err, user) {
          if(err)
            res.send(err);

            user.name = req.body.name;
            user.userName=req.body.userName;
            user.email=req.body.email;
            user.password=req.body.password;
            user.apt=req.body.apt;
            user.street=req.body.street;
            user.city=req.body.city;
            user.province=req.body.province;
            user.postal=req.body.postal;
            user.phone=req.body.phone;
            user.role = req.body.role;


            req.checkBody("name","Name is required").notEmpty();
            req.checkBody("userName","User name is required").notEmpty();
            req.checkBody("email","Enter valid email").isEmail();
            req.checkBody("password","Password is  required").notEmpty();
            req.checkBody("apt","Apartment is required").notEmpty();
            req.checkBody("street","Street name is required").notEmpty();
            req.checkBody("city","Please enter the city").notEmpty();
            req.checkBody("province","Province is reequired").notEmpty();
            req.checkBody("postal","Postal code is required").notEmpty();
            req.checkBody("phone","Phone number is required").isMobilePhone('en-US');
            req.checkBody('role','Role is required').notEmpty();


            var errors = req.validationErrors();
            if (errors) {
            res.send(errors);
         }
         else{
           user.save(function(err,status){
             if(!err){
               res.status(200).json({
                 success:true,
                 message:'User updated'
               });
             }
           });
         }
       });
     };


var deleteUser = function(req,res) {
  User.remove({
         _id: req.params.user_id
       }, function(err, user) {
         if(err)
           res.send(err);

         res.json({message: 'user Deleted'});
       });
};

module.exports = {
  deleteUser : deleteUser,
  putUser : putUser,
  getidUser : getidUser,
  getUser : getUser,
  postUser : postUser
};