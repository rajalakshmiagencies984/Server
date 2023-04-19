const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports.login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({error:"User not Found"});
        }
        const hashPassword = await bcrypt.compare(password,user.password);
        if(!hashPassword){
            res.status(401).json({message:"Password dont match"})
        }
        const token = jwt.sign({email,id:user._id},'token',{expiresIn:'10d'})
        return res.status(200).json({token,user:user});        
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.register = async(req,res)=>{
    try {
        const {name,email,password,aadhar,phone,address}=req.body;
        const user = await User.findOne({email});
        if(user){
            res.status(404).json({error:"User  Found"});
        }
        const hashPassword = await bcrypt.compare(password,user.password);
        if(!hashPassword){
            res.status(401).json({message:"Password dont match"})
        }
        const token = jwt.sign({email,id:user._id},'token',{expiresIn:'10d'})
        return res.status(200).json({token,user:user});        
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports.getAll=async(req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.changePassword=async(req,res)=>{
    try {
        const {password,email}=req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(404).send("User not Found");
        }
        const hash =await bcrypt.hash(password,12);
        const updatedUser = await User.findByIdAndUpdate(user._id,{password:hash});
        await updatedUser.save();
        const token = jwt.sign({email,id:user._id},'token',{expiresIn:'10d'})
        return res.status(200).json({token,user:user});      
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports.deleteUser = async(req,res)=>{
    const {id}=req.body;
    try {   
        await User.findByIdAndDelete(id);
        res.status(200).json({message:"Success"});
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports.editUser = async(req,res)=>{
    const {id}=req.params;
    try {
        const user = await User.findByIdAndUpdate(id,{...req.body});
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error)
    }
}