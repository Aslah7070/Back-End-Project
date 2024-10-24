// const mongoose=require("mongoose");

// const userSchema=new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//       email: {
//         type: String,
//         required: true,
//         unique: true, // Ensure email is unique
//         match: /\S+@\S+\.\S+/, // Simple email validation regex
//       },
//       address: {
//         type: String,
//         required:true,
//       },
//       password: {
//         type: String,
//         required: true,
//         // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,16}$/, 
//       },
//       cpassword:{
//         type:String,
//         required:true,
//       },
//       phonenumber: {
//         type: Number,
//         required:true,

//       },
//       admin: { 
//         type: Boolean,
//          default: false
//          },  
//     blocked: { 
//         type: Boolean,
//          default: false
//          }, 
// })

// module.exports=mongoose.model("Users",userSchema)


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: /\S+@\S+\.\S+/, // Simple email validation regex
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // You can add a password validation regex if needed
    // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 
  },
  cpassword: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Users", userSchema);
