const Joi =require("joi")


const validateTask =(task)=>{
    const schema =  Joi.object({
        title:Joi.string().required(),
        content :Joi.string().required(),
        status:Joi.string().valid("COMPLETE","TODO","IMPORTANT").required(),
        // image:Joi.object({
        // mimetype:Joi.string().valid("image/jpeg","image/png","image/jpg").required(),
        // size:Joi.number().max(10*1024*1024).required()
        // })
    })
    return schema.validate(task)
}

module.exports=validateTask