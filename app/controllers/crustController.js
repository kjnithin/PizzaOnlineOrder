var Crust = require('../models/crust');

var getCrust = function(req,res) {


      Crust.find(function(err, crusts) {
        if(err)
          res.send(err);

        res.json(crusts);
      });
    };


var postCrust = function(req,res) {
          var crust = new Crust(req.body);
          crust.save(function(err,status) {
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
                message:'crust created'
              });
            }
          });
        };

var getidCrust= function(req,res) {
  Crust.findById(req.params.crust_id, function(err, crust) {
         if(err)
           res.send(err);

         res.json(crust);
       });
};

var getCrustByStore = function(req,res){

  Crust.find({store:req.params.store}, function(err,crust){
    if(err){
      res.status(400).send(err);
    }else if(crust.length<=0){
      res.status(200).json({
        success:true,
        message: 'crust not found'
      })
    }else{
      res.status(200).json(crust);
    }
  })
}

var putCrust = function(req,res) {
Crust.findById(req.params.crust_id, function(err, crust) {
          if(err)
            res.send(err);

            crust.name = req.body.name;
            crust.price=req.body.price;

            crust.save(function(err) {
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
                message:'crust updated'
              });
            }
          });
        });
};


var deleteCrust = function(req,res) {
  Crust.remove({
         _id: req.params.crust_id
       }, function(err, crust) {
         if(err)
           res.send(err);

         res.json({message: 'crust Deleted'});
       });
};

module.exports = {
  deleteCrust : deleteCrust,
  putCrust:putCrust,
  getidCrust : getidCrust,
  getCrust : getCrust,
  postCrust : postCrust,
  getCrustByStore : getCrustByStore
};