const express = require("express");
const { PostModel } = require("../Model/PostModel");
const { Auth } = require("../Middleware/Auth.middleware");
const PostRoute= express.Router();

PostRoute.get("/",async(req,res)=>{
    const {device,devices}= req.query
const queryParam={}
if(devices){
    queryParam["device"]= {$in:devices}
}
else if(device){
    queryParam["device"]=devices
}

    try {
        const AllPost= await PostModel.find(queryParam)
        res.status(200).json({AllPost})
    } catch (error) {
        res.status(400).json({msg:"something Error"})
    }
})
PostRoute.post("/add",Auth,async(req,res)=>{
    const data= req.body
    try {
        const AddedData= new PostModel(data);
        await AddedData.save()
        res.status(200).json({msg:"Your post Added successfull"})
    } catch (error) {
        res.status(400).json({msg:"something Error"})
    }
})
PostRoute.patch("/update/:Id",Auth,async(req,res)=>{
    const {Id}= req.params;
    try {
        const ForUpadate = await PostModel.findOne({_id:Id})

        if(ForUpadate&&ForUpadate.userName==req.body.userName){
            await PostModel.findByIdAndUpdate({_id:Id},req.body)
            res.status(200).json({msg:`post Id ${Id} has been updated`})
        }
        else{
res.status(200).json({msg:"post not found"})
        }
        
    } catch (error) {
        res.status(400).json({msg:"something Error"})
    }
})
PostRoute.delete("/delete/:Id",Auth,async(req,res)=>{
    const {Id}= req.params;
    try {
        const ForDelete = await PostModel.findOne({_id:Id})

        if(ForDelete&&ForDelete.userName==req.body.userName){
            await PostModel.findByIdAndDelete({_id:Id})
            res.status(200).json({msg:`post Id ${Id} has been deleted`})
        }
        else{
res.status(200).json({msg:"post not found"})
        }
        
    } catch (error) {
        res.status(400).json({msg:"something Error"})
    }
})

module.exports={
    PostRoute
}