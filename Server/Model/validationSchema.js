const joi=require("joi")

const joiUserSchema=joi.object({
    username:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
   cpassword:joi.string().required(),
   address:joi.string().required(),
   phonenumber:joi.number().required(),
   admin:joi.boolean().optional(),
   blocked:joi.boolean().optional()
})

module.exports={joiUserSchema}