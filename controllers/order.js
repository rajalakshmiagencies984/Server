const User =require('../model/User')
const Order = require('../model/Orders')
const {sendMessage}=require('../controllers/mail.js')
const Admin = require('../model/Admin.js')
const {pushnotify}=require('../controllers/notification')
const mongoose=require('mongoose')

module.exports.newOrder=async(req,res)=>{
    try {
        const order = new Order({...req.body});
        await order.save();
        const admin = await Admin.find();
        const emails = admin.map(a=> a.email)
        if(emails.length){
            sendMessage(emails,"An new order has been placed")
        }
        res.status(201).json(order);

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


module.exports.getAll = async(req,res)=>{
    try {
        const order = await Order.find()
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


module.exports.getMyOrders=async(req,res)=>{
    const {id}=req.body;

    try {
        const orders=await Order.find({}).populate('user')
        // const mid = mongoose.Types.ObjectId(id)
        const user = await User.findById(id)
        const my_orders = await orders.filter(o => o.user._id==user.id)
        return res.status(200).json(my_orders)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }
}

module.exports.acceptOrder = async(req,res)=>{
    const {id}=req.body
    try {
        const order = await Order.findById(id)
        order.acceptedOn=new Date
        order.status="accepted"
        await order.save();
        const user = await User.findById(order.user)

        let content = "Your order has been approved by admin"
        if(user.deviceId){
            pushnotify([user.deviceId],content,content)
        }
        if(user.email){
            sendMessage([user.email],content)
        }
        res.status(200).json({msg:"success"})

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }
}

module.exports.rejectOrder=async(req,res)=>{
    const {id}=req.body
    try {
        const order = await Order.findById(id)
        order.status="rejected"
        await order.save();
        const user = await User.findById(order.user)
        let content = "Your order has been rejected by admin"
        if(user.deviceId){
            pushnotify([user.deviceId],content,content)
        }
        if(user.email){
            sendMessage([user.email],content)
        }
        res.status(200).json(order)
    } catch (error) {

    }
}

module.exports.deliveredOrder=async(req,res)=>{
    const {id}=req.body
    try{
        const order=await Order.findById(id)
        order.delieveredOn=new Date
        order.paid=true;
        order.deliveryStatus=true
        order.status="delivered"
        await order.save();

        const user = await User.findById(order.user)
        let content ="Your order has been delivered"
        if(user.deviceId){
            pushnotify([user.deviceId],content)
        }
        if(user.email){
            sendMessage([user.email],content)
        }
        res.status(200).json(order)
    }catch(Error){
        res.status(500).send(Error)
    }
}
