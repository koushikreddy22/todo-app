const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const Jwt_secret="thisisatodoappproject"


require('../models/users')
const User=mongoose.model('user')

const Requirelogin=async(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:"please login"})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,Jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"please login"})
        }
        const {_id}=payload
        User.find({_id}).then(userdata=>{
            req.user=userdata
            next()
        }
        
        )
    })
    
}
module.exports=Requirelogin