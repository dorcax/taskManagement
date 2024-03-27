const { CustomApiError } = require("./CustomError")

const ErrorHandler =(req,res,next,err)=>{
    if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({msg:err.msg})
    }
    return res.status(500).json({msg:msg})
}


module.exports=ErrorHandler