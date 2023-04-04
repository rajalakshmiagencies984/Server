const express = require('express');
const {getAllCategory,addNewCategory}=require('../controllers/category')


const router = express.Router()


router.get("/",getAllCategory)
router.post("/",addNewCategory)


module.exports=router;