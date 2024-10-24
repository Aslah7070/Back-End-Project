 
 const Users=require("../Model/userSchema")
 const {joiUserSchema}=require("../Model/validationSchema")
 
 const  getUser=async(req,res)=>{
    try {
    const result=await Users.find()
    res.send(result)
    } catch (error) {
        res.status(404).send({message:error.message})
        
    }
}

const createUser=async(req,res)=>{
       try {
        const{username,email,password,cpassword,address,phonenumber}= req.body;
       const users= new Users({username,email,password,cpassword,address,phonenumber})
      await users.save()
      res.status(201).send(users)
       } catch (error) {
        res.status(404).send({ message: error.message })
       }
}

// const createUser = async (req, res) => {
//     try {
//       const { username,email, password, cpassword, address, phonenumber } = req.body;

//       console.log(req.body);
//       console.log("dksbfadgjbs");
      
      
  
//       // Create a new user document
//       const user = new Users({username,email, password, cpassword, address, phonenumber });
  
//       // Save the user document to the database
//       await user.save();
  
//       // Send the newly created user back with a 201 status (Created)
//       res.status(201).json(user);
//     } catch (error) {
//       // Properly send the error message and status code
//       res.status(404).json({ message: error.message });
//     }
//   };
  
module.exports={getUser,createUser}

