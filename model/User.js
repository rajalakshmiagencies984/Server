const mongoose = require('mongoose');

const {Schema} =mongoose;

const userSchema = new Schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    aadharNo:String,
    joinedOn:String,

})

module.exports = new model("User",userSchema)