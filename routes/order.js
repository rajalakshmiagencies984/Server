const express = require("express")
const router= express.Router();
const {newOrder,getAll,getMyOrders}=require('../controllers/order')

router.get('/',getAll)
router.post('/',newOrder)
router.get('/:id',getMyOrders)

module.exports=router
