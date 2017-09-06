var Order = require('../models/order');

var createOrder = function(req,res){

  var order = new Order(req.body);
  order.save()
       .then(function(order){
         res.status(200).json(order);
       })
       .catch(function(err){
         res.status(400).json(err);
       })
};

var getOrders = function(req ,res){

  Order.find()
       .then(function(orders){
         res.status(200).json(orders);
       })
       .catch(function(err){
         res.status(400).json(err);
       })
};

var getOrderById = function(req,res){

  Order.findById(req.params.order_id)
       .populate('user')
       .populate('store')
       .then(function(order){
         res.status(200).json(order);
       })
       .catch(function(err){
         res.status(200).json(err);
       })
};

var getOrderByUser = function(req,res){

  Order.findOne({user:req.params.user})
       .populate('user')
       .populate('store')
       .then(function(order){
         res.status(200).json(order);
       })
       .catch(function(err){
         res.status(400).json(err);
       })
};

var getOrderByStore = function(req,res){

    Order.find({store : req.params.store})
         .populate('user')
         .populate('store')
         .then(function(order){
           res.status(200).json(order);
         })
         .catch(function(err){
           res.status(200).json(err)
         })
};

var getOrderByStoreUser = function(req,res){

   Order.find({store: req.params.storeId, user: req.params.userId})
        .populate('user')
        .then(function(order){
          if(order.length<=0){
            res.status(200).json({
              success:false,
              message: 'No order found'
            })
          }
          else{
            res.status(200).json(order);
          }
        })
        .catch(function(err){
          res.status(200).json(err);
        })
};


var deleteOrder = function(req,res){

  Order.remove({_id:req.params.order_id})
       .then(function(){
         res.status(200).json({
           success : true,
           message : "Successfully deleted"
         })
       })
       .catch(function(err){
         res.status(400).json(err);
       })
}


module.exports = {
  createOrder : createOrder,
  getOrders : getOrders,
  getOrderById : getOrderById,
  deleteOrder : deleteOrder,
  getOrderByUser : getOrderByUser,
  getOrderByStore : getOrderByStore,
  getOrderByStoreUser : getOrderByStoreUser
};
