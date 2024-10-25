 
 const Users=require("../../Model/userSchema")
 const {joiUserSchema,loginSachema}=require("../../Model/validationSchema")
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

console.log(username)
const user= await Users.findOne({username});
console.log("user ",user);

if(!user){
    return res.status(404).send("user not found")
};

const matching=await bcrypt.compare(password,user.password);
// console.log(matching?"match success":"dshd");
if(!matching){
    return res.status(400).send("password not matching")
}


res.status(200).send("success")
} catch (error) {
    res.status(400).send(error)
}


}





  
module.exports={getUser,createUser,loginUser}

