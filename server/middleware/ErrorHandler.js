const { CustomApiError } = require("./CustomError")

const ErrorHandler =(err,req,res,next)=>{
    if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:err.message})
}


module.exports=ErrorHandler