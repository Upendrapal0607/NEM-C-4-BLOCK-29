const mongoose= require("mongoose");
const UserSchema= mongoose.Schema({
name:String,
email:String,
password:String,
gender:String
},{versionKey:false})
const UserModel= mongoose.model("user",UserSchema);

module.exports={
    UserModel
}