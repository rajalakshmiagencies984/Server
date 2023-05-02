const Order = require('../model/Orders')

module.exports.newOrder=async(req,res)=>{
    try {
        const order = new Order({...req.body});
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).send(error)
    }
}

