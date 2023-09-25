const express = require("express");
const { UserModel } = require("../Model/UserModel");
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const UserRoute= express.Router();

UserRoute.get("/",async(req,res)=>{
   const totalUser= await UserModel.find();
   res.send({totalUser})
})
UserRoute.post("/register",async(req,res)=>{
    const user= req.body
    try {
        const AlraidyRegister=await UserModel.findOne({email:user.email})
        if(AlraidyRegister){
res.status(200).json({mag:"User Alraidy Exist"})
        }
        else{
      bcrypt.hash(user.password,3,async(err,hash)=>{
if(hash){
   const registeredUser= new UserModel({...user,password:hash})
   await registeredUser.save();
   res.status(200).json({msg:"new user registerd"})
}
else{
    res.status(400).json({msg:"something Error"})
}
      })
     }
    } catch (error) {
        res.status(400).json({msg:"something Error"})
    }
})
UserRoute.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
        bcrypt.compare(password,user.password,(error,result)=>{
            if(result){
const token = jwt.sign({userName:user.name,userId:user._id},"Social_Media")
           res.status(200).json({msg:"Login successful",token})
}else{
    res.status(200).json({msg:"wrong credential"})
}
        })
        }
        else{
        res.status(200).json({msg:"wrong credential"})
        }

    } catch (error) {
        res.status(400).json({msg:"something Error"})
    }
})

module.exports={
    UserRoute
}