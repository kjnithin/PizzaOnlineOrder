var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema= new Schema({
    name: {
        type:String,
        required: true,
        trim:true
    },
    userName:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true
    },
    apt:{
        type:Number,
        required: true,
        trim:true
    },
    street:{
        type:String,
        required: true,
        trim:true
    },
    city:{
        type:String,
        required: true,
        trim:true
    },
    province:{
        type:String,
        required: true
    },
    postal:{
        type:String,
        required: true,
        trim:true
    },
    phone:{
        type:String,
        required: true,
        trim:true
    },
    role:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('User', UserSchema);
