var Store = require('../models/store');


var createStore = function(req,res){

    var store = new Store(req.body);
    store.save(function(err,store){
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json(store);
        }
    });
};

var getStores = function(req,res){
  Store.find()
          .populate('owner')
          .then(function(stores){
            res.status(200).json(stores)
          })
          .catch(function(err){
            res.status(400).json(err);
          })
};

var getStoreByName = function(req,res){

    Store.findOne({name:req.params.name}, function(err,store){
        if(err){
            res.status(400).json(err);
        }
        else if(!store){
           res.status(400).json({
            success: false,
            message: "Store not found"
           })
        }
        else{
            res.status(200).json(store);
        }
    })
};

var getStoreByOwner = function(req,res){

    Store.find({owner:req.params.owner})
         .populate('owner')
         .then(function(store){
           if(store.length<=0){
             res.status(200).json({
               success : false,
               message : 'Store not found'
             })
           }
           else {
             res.status(200).json(store);
           }
         })
         .catch(function(err){
           res.status(400).json(err);
         })
};

var checkStores = function(req,res,next){

  Store.find({owner:req.params.user_id})
  .then(function(stores){
    if(stores.length <= 0){
      res.status(200).json({
        success : true,
        message : "Admin deleted"
      })
    }else{
      next();
    }
  })
  .catch(function(err){
    res.status(400).json(err);
  })
}

var deleteStore = function(req,res,next){

    Store.remove({
        owner: req.params.user_id
    }, function(err,store){
        if(err){
            res.status(400).json(err);
        }else {
          next();
        }
    });
}

var deleteStoreById = function(req,res,next){

  Store.remove({_id : req.params.store_id},function(err,store){
    if(err){
      res.status(400).json(err);
    }else{
      next();
    }
  })
};

module.exports={
    getStores : getStores,
    createStore : createStore,
    getStoreByName : getStoreByName,
    deleteStore : deleteStore,
    getStoreByOwner : getStoreByOwner,
    deleteStoreById : deleteStoreById,
    checkStores : checkStores
}
