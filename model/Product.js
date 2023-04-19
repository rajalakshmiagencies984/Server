const mongoose = require("mongoose");
const {Schema}=mongoose
const productSchema = new Schema({
    name:String,
    image:String,
    category:String,
    stock:Number,
    sold:{
        type:Number,
        default:0
    },
    prices:[
        {
            quantity:String,
            price:Number
        }
    ],
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