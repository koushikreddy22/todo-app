const express =require('express')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const router=express.Router()
const User=mongoose.model('user')
const bcrypt=require('bcrypt')
const requireLogin=require('../middleware/requirelogin.js')
const Jwt_secret="thisisatodoappproject"
router.get("/protected",requireLogin,(req,res)=>{
    res.send("hello,its working")
    console.log("working successfully")
})
router.post("/register",(req,res)=>{
    const {username,password}=req.body
    if(!username || !password){
        return res.status(422).json({error:"all fields are mandetory"})
    }
    User.findOne({username:username}).then((Saveduser)=>{
    if(Saveduser){
    res.status(422).json({error:"user already exists"})
    }
    bcrypt.hash(password,10).then((hashedpassword)=>{
        const user=new User({
            username,
            password:hashedpassword
        })
        user.save().then((user)=>{
            res.json({message:"saved"})
        }).catch((e)=>{
            console.log("error",e)
        })
    })
}).catch((e)=>{
    console.log(e)
})
})
router.post("/signin",(req,res)=>{
    const {username,password}=req.body
    if(!username || !password){
       return res.status(422).json({error:"fill all fields"})
    }
    User.findOne({username:username}).then((Saveduser)=>{
        if(!Saveduser){
        res.status(422).json({error:"user doesn't exist"})
        }
        bcrypt
        .compare(password,Saveduser.password)
        .then((doMatch)=>{
            if(doMatch){
                const token=jwt.sign({_id:Saveduser._id},Jwt_secret);
                res.json({token:token,message:"logged in"})
            }else{
                return res.status(422).json({error:"invalid username or password"})
            }
        }).catch((e)=>{
            console.log("error",e)
        })
    })
})
module.exports = router