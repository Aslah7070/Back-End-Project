const express=require("express");
const {getUser,createUser}=require("../Controlller/Users") 
const router=express.Router()

// router.get("/",users.getUser)
// router.post("/",users.createUser)

router.get("/",getUser)
router.post("/",createUser)

module.exports=router