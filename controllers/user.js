const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.login = async(req,res)=>{
    try {
        const {email,password,deviceId}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error:"User not Found"});
        }
        const hashPassword = await bcrypt.compare(password,user.password);
        if(!hashPassword){
            res.status(401).json({message:"Password dont match"})
        }
        user.deviceId=deviceId;
        await user.save();
        const token = jwt.sign({email,id:user._id},'token',{expiresIn:'10d'})
        return res.status(200).json({token,user:user});
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.register = async(req,res)=>{
    try {
        const {name,email,password,aadhar,phone,deviceId}=req.body;

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({error:"User Already Found"});
        }
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({name,email,aadhar,phone,deviceId,password:hashPassword})
        await newUser.save();
        const token = jwt.sign({email,id:newUser._id},'token',{expiresIn:'10d'})
        return res.status(200).json({token,user:newUser});

    } catch (error) {
        console.log(error)
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

module.exports.getUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user)
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

module.exports.addAddress = async(req,res)=>{
    try {
        const {id,street,pinCode,doorNo,city}=req.body
        const user = await User.findById(id);
        const obj ={street,pinCode,doorNo,city};
        await user.address.push(obj);
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
