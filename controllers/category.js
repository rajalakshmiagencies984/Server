const Category = require('../model/Category')


module.exports.getAllCategory =  async(req,res)=>{
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.addNewCategory = async(req,res)=>{
    try {
        const category = new Category({...req.body});
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.deleteCategory = async(req,res)=>{
    try{
        const {id}=req.body;
        console.log(req.body)
        await Category.findByIdAndDelete(id);
        res.status(200).json({message:"Success"})
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports.editCategory = async(req,res)=>{
    try {
        const {id}=req.params
        const category = await Category.findByIdAndUpdate(id,{...req.body});
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).send(error)
    }
}