const mongoose = require("mongoose");
const {Schema}=mongoose
const productSchema = new Schema({
    name:String,
    mrp:Number,
    image:String,
    category:String,
    gst:String,
    stock:Number,
    sold:Number,
    chemicals:[
        {
            name:String,
            percentage:Number,
        }
    ],
    products:[
        {
            name:String
        }
    ],
    effects:[
        {
            point:String
        }
    ],
    createdOn:{
        type:Date,
        default:Date.now
    }

}) 


module.exports = mongoose.model("Product",productSchema)