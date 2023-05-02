const mongoose = require('mongoose')
const {Schema}=mongoose

const serverSchema = new Schema({
    server:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Server",serverSchema)