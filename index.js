const express = require("express")
const app=express();
const dotenv = require("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")
const categoryRoutes = require("./routes/category")
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const serverRoutes = require('./routes/server')
const adminRoutes = require('./routes/admin')
const orderRoutes = require('./routes/order')
const paymentRoutes=require('./routes/payment')

app.use(cors())
app.use(express.json({extended:true}))
app.use(express.urlencoded({ extended: true }));
dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR",err.message)
})

app.get('/',(req,res)=>{
    res.redirect('/api/')
})


app.get('/api/',async(req,res)=>{
    res.send("Rajalakshmi Agencies")
})


app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/user',userRoutes)
app.use('/api/server',serverRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/payment',paymentRoutes)

app.use("*",(req,res)=>{
    res.status(500).send("Error Occured")
})

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Started listening on port",PORT)
})


