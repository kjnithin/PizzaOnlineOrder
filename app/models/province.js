var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var ProvinceSchema= new Schema({
  name: {type:String,required: true},
  tax:{type:Number,required:true}
});

module.exports = mongoose.model('Province', ProvinceSchema);
