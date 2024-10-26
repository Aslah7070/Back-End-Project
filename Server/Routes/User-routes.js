const express=require("express");
const {getUser,createUser,loginUser}=require("../Controlller/Users-side/Users") 
// const users=require("../Controlller/Users") 
const products=require("../Controlller/Users-side/Products")
const router=express.Router()
const cart=require("../Controlller/Users-side/Cart")

// router.get("/",users.getUser)
// router.post("/",users.createUser)
router
      //user signup,login,logout........
.get("/",getUser)
.post("/signup",createUser)
.post("/login",loginUser)

      //Products Routes.........
// .post("/data",data)   
.get("/products",products.getAllProducts)  
.get("/products/:category",products.getProductByCategory)  
.get("/productsby/:id",products.getProductById)  

.post("/cart",cart.addToCart)
.get("/getcart",cart.getCartItem)



module.exports=router