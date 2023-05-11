const User=require('../model/User.js')
const Order = require('../model/Orders')

module.exports.newOrder=async(req,res)=>{
    try {
        const order = new Order({...req.body});
        await order.save();
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
