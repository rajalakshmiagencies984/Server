const mongoose = require("mongoose")
const {Schema}=mongoose

const categorySchema = new Schema({
    title:String,
    image:String,
    background:String,
    color:String,
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    createdOn:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Category",categorySchema)
