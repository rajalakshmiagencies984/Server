const express = require("express")

const { getProducts,addProduct,editProduct,deleteProduct } =require("../controllers/products");
const router=express.Router();


router.get('/',getProducts);
router.post('/',addProduct)
router.delete("/",deleteProduct)
router.patch('/:id',editProduct)



module.exports =router;