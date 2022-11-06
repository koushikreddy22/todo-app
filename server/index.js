const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const taskRoute=require('./routes/task.js')
const app=express()
const port =4000 || process.env.port
mongoose.connect('mongodb+srv://koushik:Mn1MrKr1L45@cluster0.wz0fvfe.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
});
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err);
});
app.use(cors())
require('./models/users.js')
require('./models/task.js')

app.use(express.json())
app.use(require('./routes/task.js'))
app.use(require('./routes/auth.js'))
app.use("/tasks",taskRoute)



app.listen(port,()=>console.log(`The server is running on ${port}`))