var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var StoreSchema= new Schema({
 name: {
   type: String,
   trim: true,
   required: 'Please enter the Store name'
  },
  description: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  address:{
    type:String,
    required:'Please provide the address',
    trim:true
  },
  image:{
    type:String,
    trim:true
  },
  owner:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:'Please provide the owner'
  }
});

module.exports = mongoose.model('Store', StoreSchema);
