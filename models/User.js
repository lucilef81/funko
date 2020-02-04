const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true,
  },
  details:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  
});

mongoose.model('user', UserSchema);