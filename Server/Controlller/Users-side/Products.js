const Product=require("../../Model/productSchema");

const data=async(req,res)=>{
  
    const{category,image,imageCategory,description,price,quantity,offerPrice,details}= req.body
    const products=new Product({category,image,imageCategory,description,price,quantity,offerPrice,details})
    // console.log("deyails",req.body);
    
 
   await products.save();
   res.status(201).send(products)
//   } catch (error) {
//     return res.status(400),res.send(error,"dfdgsh")
//   }
}

module.exports={data}
