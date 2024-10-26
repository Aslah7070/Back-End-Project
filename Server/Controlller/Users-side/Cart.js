// const Cart=require("../../Model/cartSchema");


// const addToCart=async(req,res)=>{
//    const {productsId,user} =req.body;
// //    console.log(user);

//    let addToCart =await Cart.findOne({user})
//    console.log("caaaart",cart);
   
// //    let cart = await Cart.findOne({ user: id }).populate('products.productId');
// // console.log(cart);

// if(addToCart){
//     const existingProduct=addToCart.products.find((item)=>{
//         console.log("producr id",item.productsId);
        
//        return  item.productsId==productsId
//     })
//     if(existingProduct){
//         existingProduct.quantity+=1 
//     }else{
//         addToCart.products.push({productsId:productsId,quantity:1})
//     }
//     await addToCart.save()

// }

//    if (!addToCart) {
//     const newCart = new Cart({
//         user: user,
//         products: [{ productsId:productsId,quantity:1 }]
//     });
//     await newCart.save();

//     const cartsend = await newCart.populate('products.productId');
//     return res.status(201).json(cartsend);
// }
// console.log('Incoming productId:', productsId   );
// return res.status(201).json("cartsend");

// }

// module.exports={addToCart}


const Cart = require("../../Model/cartSchema");

const addToCart = async (req, res) => {
    const { productsId, user } = req.body;

    // Find the cart for the specified user
    let addProduct = await Cart.findOne({ user });
    console.log("Cart found:", addProduct);

    if (addProduct) {
        // Access the products from the cart instance
        const existingProduct = addProduct.products.find((item) => {
            console.log("Product ID:", item.productsId);
            return item.productsId.toString() === productsId; // Ensure correct comparison
        });

        if (existingProduct) {
            existingProduct.quantity += 1; // Increment quantity
        } else {
            // Add new product to cart
            addProduct.products.push({ productsId: productsId, quantity: 1 });
        }

        // Save the updated cart instance
        await addProduct.save();
        return res.status(200).json(addProduct); // Return the updated cart
    } 

    // If no cart found, create a new one
    const newCart = new Cart({
        user: user,
        products: [{ productsId: productsId, quantity: 1 }]
    });

    await newCart.save();
    const cartsend = await newCart.populate('products.productsId'); // Ensure you populate correctly
    return res.status(201).json(cartsend);
};

const getCartItem=async (req,res)=>{
//    const {id}= req.body;
//    console.log("hell",req.body);
   
    const getItem=await Cart.findOne({id}).populate("products.productsId")

    res.status(201).json(getItem)
}

module.exports = { addToCart,getCartItem };


