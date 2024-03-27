class CustomApiError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }

}

// create class instance

const CustomError =(msg,statusCode)=>{
    return new CustomApiError(msg,statusCode)

}
module.exports= {CustomApiError,CustomError}