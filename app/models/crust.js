var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var CrustSchema= new Schema({
  name: {
    type:String,
    required: 'Please provide the crust name',
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

module.exports = mongoose.model('Crust', CrustSchema);
