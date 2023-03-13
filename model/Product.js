const mongoose = require("mongoose");
const {Schema}=mongoose
const productSchema = new Schema({
    name:String,
    type:String,
    price:Number,
    stock:String,
    composition:String,
    sold:String,
    mrp:Number,
}) 


module.exports = new module("Porduct",productSchema)