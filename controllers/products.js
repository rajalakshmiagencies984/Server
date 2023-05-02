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
        res.status(500).send(error)
    }
}

module.exports.getProducts =async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.editProduct = async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,{...req.body});
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports.deleteProduct=async(req,res)=>{
    
    try {
        const {id}=req.body
        const product =await Product.findById(id)
        const category = await Category.findOne({title:product.category})
        await category.products.remove(product._id);
        await Product.findByIdAndDelete(id);
        await category.save();
        res.status(200).json({message:"Successfull"})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}