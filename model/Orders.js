const mongoose = require('mongoose')
const {Schema}=mongoose

const orderSchema = new Schema({
        products:[
            {
                product_id:{
                    type:Schema.Types.ObjectId,
                    ref:"Product"
                },
                quantity:{
                    type:String
                },
                price:{
                    type:Number,
                },
                quantityOfProducts:{
                    type:Number
                },
                totalAmount:{
                    type:Number
                }
            }
        ],
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        address:{
            type:String,
        },
        totalAmount:{
            type:Number
        },
        status:{
            type:String,
            enum:['ordered','accepted','onprocess','delivered','canceled']
        },
        orderedOn:{
            type:Date,
            default:Date.now
        },
        acceptedOn:{
            type:Date,
            default:null
        },
        delieveredOn:{
            type:Date,
            default:null
        },
        deliveryStatus:{
            type:Boolean,
            default:false
        },
        modeOfPayment:{
            type:String,
            enum:['cash','online']
        },
        paid:{
            type:Boolean,
        }
})

module.exports = mongoose.model("Order",orderSchema)