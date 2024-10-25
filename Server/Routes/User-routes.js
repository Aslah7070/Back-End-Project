const express=require("express");
const {getUser,createUser,loginUser}=require("../Controlller/Users-side/Users") 
// const users=require("../Controlller/Users") 
const {data}=require("../Controlller/Users-side/Products")
const router=express.Router()

// router.get("/",users.getUser)
// router.post("/",users.createUser)
router
      //user signup,login,logout........
.get("/",getUser)
.post("/signup",createUser)
.post("/login",loginUser)

      //Products Routes.........
.post("/data",data)     


module.exports=router