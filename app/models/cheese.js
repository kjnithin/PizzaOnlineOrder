var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var CheeseSchema= new Schema({
  name: {type:String,required: true},
  price:{type:Number,required:true}
});

module.exports = mongoose.model('Cheese', CheeseSchema);
