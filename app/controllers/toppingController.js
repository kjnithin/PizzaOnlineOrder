var Topping = require('../models/topping');


var postTopping = function(req,res) {

          var topping = new Topping(req.body);

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

var getTopping = function(req,res) {
  Topping.find(function(err, toppings) {
        if(err){
          res.status(400).send(err);
        }
        else if(toppings.length<=0){
      res.status(400).send({
        success:false,
        message:'Toppings not found'
      })
    }
    else{
      res.status(200).send(toppings)
    }
      });
    };

var getidTopping= function(req,res) {

  Topping.findById(req.params.topping_id, function(err, topping) {
         if(err){
           res.send(err);
         }
         else{
          res.status(200).json(topping);
         }
      })
};

var getToppingsByStore = function(req,res){

  Topping.find({store : req.params.store}, function(err,topping){
    if(err){
      res.status(400).send(err);
    }
    else if(topping.length<=0){
      res.status(400).send({
        success:false,
        message:'Toppings not found'
      })
    }
    else{
      res.status(200).send(topping)
    }
  })
}

var putTopping = function(req,res) {
  Topping.findById(req.params.topping_id, function(err, topping) {
          if(err)
              res.send(err);

            topping.name = req.body.name;
            topping.value = req.body.value;
            topping.price=req.body.price;

            topping.save(function(err) {
            if(err){
              res.status(400).json({
                success:false,
                message: 'Invalid request'
              });
            }
            else{
              res.status(200).send({
                success:true,
                message:'Toppings updated'
              });
            }
          });
        });
};

var checkTopping = function(req, res, next) {

  Topping.find({
      store: req.params.store_id
    })
    .then(function(topping) {
      if (topping.length <= 0) {
        res.status(200).json({
          success: true,
          message: "store,cheese,crust & size deleted"
        })
      } else {
        next();
      }
    })
    .catch(function(err) {
      res.status(400).json(err);
    })
}

var deleteToppingByStore = function(req,res){

  Topping.remove({store : req.params.store_id},function(err , topping){
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json({
        success : true,
        message : "Toppings related to store is deleted"
      })
    }
  })
}

var deleteTopping = function(req,res) {
    Topping.remove({
         _id: req.params.topping_id
       }, function(err, topping) {
         if(err){
           res.send(err);
         }
         else{
          res.status(200).send({message: 'Toppings Deleted'});
         }

       });
};


module.exports = {
  deleteTopping : deleteTopping,
  putTopping : putTopping,
  getTopping : getTopping,
  postTopping : postTopping,
  getidTopping : getidTopping,
  getToppingsByStore : getToppingsByStore,
  checkTopping : checkTopping,
  deleteToppingByStore : deleteToppingByStore
};
