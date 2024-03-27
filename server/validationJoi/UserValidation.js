const Joi=require("joi")


const validateUser =(user)=>{
    const schema =Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required()
    })
    return schema.validate(user)
}

const validateLogin =(user)=>{
    const schema =Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required()
    })
    return schema.validate(user)
}

module.exports={validateLogin,validateUser}