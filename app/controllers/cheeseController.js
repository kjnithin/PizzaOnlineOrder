var Cheese = require('../models/cheese');

var getCheese = function(req,res) {


      Cheese.find(function(err, cheeses) {
        if(err)
          res.send(err);

        res.json(cheeses);
      });
    };


var postCheese = function(req,res) {
          var cheese = new Cheese(req.body);
          cheese.save(function(err,status) {
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
                message:'cheese created'
              });
            }
          });
        };

var getidCheese= function(req,res) {
  Cheese.findById(req.params.cheese_id, function(err, cheese) {
         if(err)
           res.send(err);

         res.json(cheese);
       });
};

var getCheeseByStore = function(req,res){

  Cheese.find({store:req.params.store}, function(err,cheese){
    if(err){
      res.status(400).send(err);
    }else if(cheese.length<= 0){
      res.status(400).json({
            success: false,
            message: "cheese not found"
           });
    }
    else{
      res.status(200).json(cheese);
    }
  })
}
var putCheese = function(req,res) {
Cheese.findById(req.params.cheese_id, function(err, cheese) {
          if(err)
            res.send(err);

            cheese.name = req.body.name;
            cheese.price=req.body.price;

            cheese.save(function(err) {
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
                message:'cheese updated'
              });
            }
          });
        });
};


var deleteCheese = function(req,res) {
  Cheese.remove({
         _id: req.params.cheese_id
       }, function(err, cheese) {
         if(err)
           res.send(err);

         res.json({message: 'cheese Deleted'});
       });
};

module.exports = {
  deleteCheese :deleteCheese,
  putCheese : putCheese,
  getCheese : getCheese,
  getidCheese : getidCheese,
  postCheese : postCheese,
  getCheeseByStore : getCheeseByStore
};