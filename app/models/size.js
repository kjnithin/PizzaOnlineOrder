var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SizeSchema= new Schema({
  name: {
    type:String,
    required: 'Please provide the size name',
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

module.exports = mongoose.model('Size', SizeSchema);
