const express = require("express")
const app=express();
const dotenv = require("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")



app.use(cors())
app.use(express.json({extended:true}))
app.use(express.urlencoded({ extended: true }));
dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR",err)
})

app.get('/',(req,res)=>{
    res.send("RAJALKSHMI AGENCIES")
})


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Started listening on port",PORT)
})


