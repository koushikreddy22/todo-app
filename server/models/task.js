const mongoose=require('mongoose')
const taskSchema=new mongoose.Schema({
    task:{
        type:String
    },
    time:{
        type:String
    },
    user_id:{type:mongoose.Types.ObjectId,reference:"user" }
})
const tasks=mongoose.model("task",taskSchema)
module.exports = tasks