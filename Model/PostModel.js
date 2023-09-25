const mongoose= require("mongoose");
const PostSchema= mongoose.Schema({
title:String,
body:String,
userName:String,
userId:String,
device:{
    type:String,
    enum:["PC","TABLET","MOBILE"]
},

},{versionKey:false})
const PostModel= mongoose.model("post",PostSchema);

module.exports={
    PostModel
}