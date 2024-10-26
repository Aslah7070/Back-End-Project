
const mongoose=require("mongoose");

const productsSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,auto:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    imageCategory:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    offerPrice:{type:Number,required:true},
    newCollections:{type:Boolean,required:true},
    outDoor:{type:Boolean,required:true},
    details:{type:String,required:true},
})
module.exports=mongoose.model("Products",productsSchema)