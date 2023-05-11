const User =require('../model/User')
const Order = require('../model/Orders')
const {sendMessage}=require('../controllers/mail.js')
const Admin = require('../model/Admin.js')
const {pushnotify}=require('../controllers/notification')

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
    const {id}=req.params;

    try {
        const order=await Order.find().populate('user');
        const orders = order.filter(o => o.user._id==id)
        return res.status(200).json(orders)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.acceptOrder = async(req,res)=>{
    const {id}=req.body
    try {
        const order = await Order.findById(id)
        order.acceptedOn=Date.now
        order.status="accepted"
        await order.save();
        const user = await User.findById(order.user)
        if(user.deviceId){
            pushnotify([user.deviceId],"Your order has been approved by admin","Your order has been approved by admin")
        }
        res.status(200).json(order)
    } catch (error) {
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
        if(user.deviceId){
            pushnotify([user.deviceId],"Your order has been approved by admin","Your order has been approved by admin")
        }
        res.status(200).json(order)
    } catch (error) {

    }
}

module.exports.deliveredOrder=async(req,res)=>{
    const {id}=req.body
    try{
        const order=await Order.findById(id)
        order.delieveredOn=Date.now
        order.paid=true;
        order.deliveryStatus=true
        order.status="delivered"
        await order.save();

        const user = await User.findById(order.user)
        if(user.deviceId){
            pushnotify([user.deviceId],"Your order has been delivered","Your order has been delivered")
        }
        res.status(200).json(order)
    }catch(Error){
        res.status(500).send(Error)
    }
}
