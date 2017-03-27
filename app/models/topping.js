var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var ToppingSchema= new Schema({
  name: {type:String,required: true},
  value:{type:String,required: true},
  price:{type:Number,required:true}
});

module.exports = mongoose.model('Topping', ToppingSchema);
