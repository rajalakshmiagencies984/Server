const mongoose = require('mongoose');

const {Schema} =mongoose;

const userSchema = new Schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    aadhar:String,
    deviceId:String,
    address:[
      {
       doorNo:{
         type:String,
       },
       street:{
        type:String,
       },
       city:{
        type:String,
       },
       pinCode:{
        type:Number,
       }
    }
  ],
    joinedOn:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("User",userSchema)