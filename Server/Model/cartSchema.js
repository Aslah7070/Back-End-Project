const { required } = require("joi");
const mongoose=require("mongoose");
const cartSchema= mongoose.Schema({
    user:[{type:mongoose.Schema.ObjectId,ref:"Users"}],
    products:[{
        productsId:{type:mongoose.Schema.ObjectId,ref:"Products"},
        quantity:{type:Number,required:true,default:1}
    }
    ]
})
module.exports=mongoose.model("Cart",cartSchema)