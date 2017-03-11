var Topping = require('../models/topping');

var getTopping = function(req,res) {
  Topping.find(function(err, toppings) {
        if(err)
          res.send(err);

        res.json(toppings);
      });
    };


var postTopping = function(req,res) {
          var topping = new Topping();
          topping.name = req.body.name;
          topping.price=req.body.price;


          topping.save(function(err,status) {
            if(err){
              res.status(400).json({
                success:false,
                message: 'Invalid request',
                error: err
              });
            }
            else{
              res.status(200).json({
                success:true,
                message:'topping created'
              });
            }
          });
        };

var getidTopping= function(req,res) {
  Topping.findById(req.params.topping_id, function(err, topping) {
         if(err)
           res.send(err);

         res.json(topping);
       });
};

var putTopping = function(req,res) {
Topping.findById(req.params.topping_id, function(err, topping) {
          if(err)
            res.send(err);

            topping.name = req.body.name;
            topping.price=req.body.price;

            topping.save(function(err) {
            if(err){
              res.status(400).json({
                success:false,
                message: 'Invalid request',
                error: errors
              });
            }
            else{
              res.status(200).json({
                success:true,
                message:'Toppings updated'
              });
            }
          });
        });
};


var deleteTopping = function(req,res) {
  topping.remove({
         _id: req.params.topping_id
       }, function(err, topping) {
         if(err)
           res.send(err);

         res.json({message: 'Toppings Deleted'});
       });
};


module.exports = {
  deleteTopping : deleteTopping,
  putTopping : putTopping,
  getTopping : getTopping,
  postTopping : postTopping,
  getidTopping : getidTopping
}