const express=require("express");
const app=express();
app.use(express.json())
const mongoose=require("mongoose")
const cors=require("cors");
const userRoutes=require("./Routes/User-routes")
// app.use(cors())

app.use("/users",userRoutes)
// app.use("/Products",userRoutes)
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connecting");
    
}).catch((errr)=>console.log(errr))

app.listen(3000,()=>console.log("server started"))