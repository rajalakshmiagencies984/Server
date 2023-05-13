const express = require("express")
const router= express.Router();
const {newOrder,getAll,getMyOrders,acceptOrder,deliveredOrder, rejectOrder}=require('../controllers/order')

router.get('/',getAll)
router.post('/',newOrder)
router.get('/:id',getMyOrders)
router.post('/accept',acceptOrder)
router.post('/reject',rejectOrder)
router.post('/delivery',deliveredOrder)
module.exports=router
