const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FunkoSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  details:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

mongoose.model('funko', FunkoSchema);