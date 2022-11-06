const express=require('express')
const Task=require('../models/task.js')
const mongoose=require('mongoose')
const requireLogin=require('../middleware/requirelogin.js')
const Tasks = require('../models/task.js')
const router=express.Router()
router.get("/",requireLogin, async (req,res)=>{
    try{
        const task = await Tasks.find({user_id:req.user})
        return res.status(200).json({data:task})

    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }

})
router.post("/",requireLogin, async (req,res)=>{
    const {tasks,time}=req.body
    const task= await Tasks.create({
        tasks,
        user_id:mongoose.Types.ObjectId(req.user[0]._id),
        time
    })
    res.json({
        status:success,
        data:task
    })

})
module.exports=router