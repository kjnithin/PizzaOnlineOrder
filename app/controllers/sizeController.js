var Size = require('../models/size');

var getSize = function(req,res) {


      Size.find(function(err, sizes) {
        if(err)
          res.send(err);

        res.json(sizes);
      });
    };


var postSize = function(req,res) {
          var size = new Size(req.body);
          size.save(function(err,status) {
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
                message:'size created'
              });
            }
          });
        };

var getidSize = function(req,res) {
  Size.findById(req.params.size_id, function(err, size) {
         if(err){
           res.send(err);
         }
         else{
           res.json(size);
         }
       });
};

var getSizeByStore = function(req,res){
  Size.find({store:req.params.store}, function(err,size){
    if(err){
      res.status(400).send(err);
    }
    else if(size.length<=0){
      res.status(400).send({
        success:false,
        message:'size not found'
      })
    }else{
      res.status(200).json(size);
    }
  })
};

var putSize = function(req,res) {
  Size.findById(req.params.size_id, function(err, size) {
          if(err)
            res.send(err);

            size.name = req.body.name;
            size.price=req.body.price;

            size.save(function(err) {
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
                message:'size updated'
              });
            }
          });
        });
};


var deleteSize = function(req,res) {
  Size.remove({
         _id: req.params.size_id
       }, function(err, size) {
         if(err)
           res.send(err);

         res.json({message: 'size Deleted'});
       });
};

module.exports = {
  deleteSize : deleteSize,
  getSize : getSize,
  getidSize : getidSize,
  postSize : postSize,
  putSize :putSize,
  getSizeByStore : getSizeByStore
};