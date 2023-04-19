const express = require('express');
const {getAllCategory,addNewCategory, deleteCategory, editCategory}=require('../controllers/category')


const router = express.Router()


router.get("/",getAllCategory)
router.post("/",addNewCategory)
router.delete("/",deleteCategory)
router.patch('/:id',editCategory)



module.exports=router;