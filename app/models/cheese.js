var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheeseSchema= new Schema({
  name: {
    type:String,
    required: 'Please provide the cheese name',
    trim: true
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

module.exports = mongoose.model('Cheese', CheeseSchema);
