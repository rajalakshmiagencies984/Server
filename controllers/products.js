const Product = require('../model/Product')
const Category = require('../model/Category')
module.exports.addProduct = async(req,res)=>{
    try {
        const {category}=req.body
        const product = new Product({...req.body});
        await product.save();
        const categorymodel = await Category.findOne({title:category});
        categorymodel.products.push(product)
        await categorymodel.save();
        res.status(201).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error})
    }
}

module.exports.getProducts =async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error})
    }
}