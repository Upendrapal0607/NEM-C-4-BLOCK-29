const jwt = require("jsonwebtoken")
const Auth=(req,res,next)=>{
    const token =req.headers.authorization;
    console.log({token});
    try {
        jwt.verify(token,"Social_Media",(err,decode)=>{
        console.log({decode})
            if(decode){
  req.body.userName= decode.userName
  req.body.userId= decode.userId
  next()
            }else{
                res.status(400).json({err:"you are not authorized"})
            }
        })
    } catch (error) {
        res.status(400).json({msg:"error accurse"})
    }
}

module.exports={
    Auth
}