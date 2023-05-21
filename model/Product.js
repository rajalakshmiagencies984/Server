const mongoose = require("mongoose");
const {Schema}=mongoose
const productSchema = new Schema({
    name:String,
    image:String,
    category:String,
    sold:{
        quantity:Number,
        price:Number,
    },
    prices:[
        {
            quantity:String,
            price:Number,
            stock:Number,
        }
    ],
    chemicals:[
        {
            name:String,
            percentage:Number,
            stock:Number
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
