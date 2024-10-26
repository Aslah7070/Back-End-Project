require("dotenv").config()
 const Users=require("../../Model/userSchema")
 const {joiUserSchema,loginSachema}=require("../../Model/validationSchema")
 const jwt=require("jsonwebtoken")
 const bcrypt=require("bcrypt")
 

 const  getUser=async(req,res)=>{
    try {
    const result=await Users.find()
    res.send(result)
    } catch (error) {
        res.status(404).send({message:error.message})
        
    }
}


//user registration..............
const createUser=async(req,res)=>{
       try {
       const {value,error} = joiUserSchema.validate(req.body)
        const{username,email,password,cpassword,address,phonenumber}=value;
        if(error){
            return res.status(400).json({error:"error"})
        }

        if(password!==cpassword){
            return res.status(400).json({error:"password not match"})
        }
        

        const hashedpassword=await bcrypt.hash(password,8)
       const users= new Users({username,email,password:hashedpassword,cpassword:hashedpassword,address,phonenumber})
      await users.save()
      res.status(201).send(users)
       } catch (error) {
        res.status(404).send({ message: error.message })
       }
}


// user login.........
const loginUser=async(req,res)=>{
try {
    const {value,error}=loginSachema.validate(req.body);
if(error){
    return res.status(400).send(error,"joivalidate error")
}
const {password,username}=value

// console.log(username)
const user= await Users.findOne({username});
console.log("user ",user);

if(!user){
    return res.status(404).send("user not found")
};

const matching=await bcrypt.compare(password,user.password);
console.log(matching);

// console.log(matching?"match success":"dshd");
if(!matching){
    return res.status(400).json("password not matching")
}
let token=jwt.sign({id:user._id,username:user.username,email:user.email},process.env.JWT_TOKEN,{expiresIn:"30m"});
const refreshToken = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_TOKEN, { expiresIn: '7d' })
// console.log("tokendnd",token);

res.cookie('token', token, {
    httpOnly: true,    
    secure: true,      
    maxAge: 24 * 60 * 60 * 1000, // 7 day
    sameSite: 'lax',   
});
res.cookie('refreshToken', refreshToken, {
    httpOnly: true,    
    secure: true,      
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'lax',   
});

console.log("helloo");


// res.status(200).json({status:"success",message:"login successfully",token:token,refreshToken})
res.status(200).json({ status: 'success', message: "Logged in successfully", token: token, refreshToken })
// res.status(200).send("success")
} catch (error) {
    console.error("Login error:", error);
        res.status(400).send({ error: "Login failed", details: error.message });
}


}





// const loginUser = async (req, res) => {
//     try {
//         const { value, error } = loginSachema.validate(req.body);
//         if (error) {
//             return res.status(400).send({ error: error.details[0].message, message: "Joi validation error" });
//         }
        
//         const { password, username } = value;
//         const user = await Users.findOne({ username });
        
//         if (!user) {
//             return res.status(404).send("User not found");
//         }
        
//         const matching = await bcrypt.compare(password, user.password);
//         if (!matching) {
//             return res.status(400).json("Password not matching");
//         }
        
//         let token = jwt.sign(
//             { id: user._id, username: user.username, email: user.email },
//             process.env.JWT_TOKEN,
//             { expiresIn: "30m" }
//         );
//         const refreshToken = jwt.sign(
//             { id: user._id, username: user.username, email: user.email },
//             process.env.JWT_KEY,
//             { expiresIn: '7d' }
//         );
        
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 24 * 60 * 60 * 1000,
//             sameSite: 'lax',
//         });
//         res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//             sameSite: 'lax',
//         });

//         res.status(200).json({ status: 'success', message: "Logged in successfully", token, refreshToken });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(400).send({ error: "Login failed", details: error.message });
//     }
// };

// module.exports = { loginUser };




  
module.exports={getUser,createUser,loginUser}

