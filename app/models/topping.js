var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToppingSchema= new Schema({
  name: {
    type:String,
    required: 'Please provide the toppings',
    trim:true
},
  value:{
    type:String,
    required: 'Please provide the value ',
    trim:true
},
  price:{
    type:Number,
    required:'Please provide the price'
},
image:{
  type:String,
  trim:true
},
store:{
    type:mongoose.Schema.ObjectId,
    ref:'Store',
    required:'Please provide the store'
  }
});

module.exports = mongoose.model('Topping', ToppingSchema);
