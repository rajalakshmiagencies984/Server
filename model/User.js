const mongoose = require('mongoose');

const {Schema} =mongoose;

const userSchema = new Schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    aadharNo:String,
    joinedOn:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("User",userSchema)