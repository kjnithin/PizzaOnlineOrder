var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var ProvinceSchema= new Schema({
  name: {
    type:String,
    required: 'Please provide the province name',
    trim:true
},
  tax:{
    type:Number,
    required:'Please provide the tax'
}
});

module.exports = mongoose.model('Province', ProvinceSchema);
