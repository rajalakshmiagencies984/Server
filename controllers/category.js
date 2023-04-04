const Category = require('../model/Category')


module.exports.getAllCategory =  async(req,res)=>{
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports.addNewCategory = async(req,res)=>{
    try {
        const category = new Category({...req.body});
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports.deleteCategory = async(req,res)=>{
    try{
        const {id}=req.body;
        await Category.findByIdAndDelete(id);
        res.status(200).json({message:"Success"})
    }catch(error){
        res.status(500).json({error:error})
    }
}