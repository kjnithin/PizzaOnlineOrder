var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var UserSchema= new Schema({
    name: {type:String,required: true},
    userName:{type:String,required: true},
    email:{type:String,required: true},
    password:{type:String,required: true},
    apt:{type:Number,required: true},
    street:{type:String,required: true},
    city:{type:String,required: true},
    province:{type:String,required: true},
    postal:{type:String,required: true},
    phone:{type:String,required: true},
    role:{type:String,required:true}
});



module.exports = mongoose.model('User', UserSchema);
