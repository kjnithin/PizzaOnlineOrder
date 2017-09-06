var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var OrderSchema  = new Schema({

size:{
  name:{
    type: String,
    trim:true,
    required:'Please provide the name of the'
  },
  price:{
    type: Number,
    required:'Please provide the price'
  }
},
crust:{
  name:{
    type: String,
    trim:true,
    required:'Please provide the name of the'
  },
  price:{
    type: Number,
    required:'Please provide the price'
  }
},
cheese:{
  name:{
    type: String,
    trim:true,
    required:'Please provide the name of the'
  },
  price:{
    type: Number,
    required:'Please provide the price'
  }
},
veggie:[
  {
    name:{
      type: String,
      trim:true
    },
    price:{
      type: Number
    }
  }
],
meat:[
  {
    name:{
      type:String,
      trim:true
    },
    price:{
      type:Number
    }
  }
],
total:{
  price:{
    type:Number
  }
},

  store:{
     type:mongoose.Schema.ObjectId,
     ref:'Store',
     required:'Please provide the store'
   },
   user:{
     type:mongoose.Schema.ObjectId,
     ref:'User',
     required:'Please provide the user'
   },
   created: {
       type: Date,
       default: Date.now
  }
});

module.exports = mongoose.model('Order',OrderSchema);
