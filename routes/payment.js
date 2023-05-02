const express = require("express")
const router = express.Router();
const {postIntent}=require('../controllers/payment')

router.post('/intent',postIntent)

module.exports=router;