const Product=require("../../Model/productSchema");

// const data=async(req,res)=>{
//   try{
//     const{category,image,imageCategory,description,price,quantity,offerPrice,details}= req.body
//     const products=new Product({category,image,imageCategory,description,price,quantity,offerPrice,details})
//     // console.log("deyails",req.body);
    
 
//    await products.save();
//    res.status(201).send(products)
//   } catch (error) {
//     return res.status(400),res.send(error,"dfdgsh")
//   }
// }

// module.exports={data}
const getAllProducts=async(req,res)=>{
 try {
    const result= await Product.find()
    console.log(result);
   
    
    if(!result){
      return res.status(400).send("product not found")
    }
     res.send(result)
 } catch (error) {
    res.status(404).send(error)
 }

}

const getProductById=async(req,res)=>{
    try {
       const productId= req.params.id;
       const result= await Product.findById(productId)
       console.log(result);
      
       
       if(!result){
         return res.status(400).send("product not found")
       }
        res.send(result)
    } catch (error) {
       res.status(404).send(error)
    }
   
   }

   const getProductByCategory=async(req,res)=>{
    try {
      const category=  req.params.category
      const product = await Product.find({ category:category})
    res.json(product)
      if(!result){
        res.status(404).send("not found")
      }

      res.status(200).json(result)

    } catch (error) {
        res.status(401).send(error)
    }
   }




  


module.exports={getAllProducts,getProductById,getProductByCategory}