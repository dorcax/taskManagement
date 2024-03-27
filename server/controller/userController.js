const db =require("../connection/db")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
const { validateUser, validateLogin } = require("../validationJoi/UserValidation")
const { CustomError } = require("../middleware/CustomError")

// an endpoint to register user
module.exports.createUser =async(req,res,next)=>{
    try {
        const {name,email,password} =req.body
        const{error}=validateUser(req.body)
        if(error){
            return next(CustomError(error.details[0].message,404))
        }
        const existingUser =await db.user.findUnique({
            where:{
                email:email
            }
          
        })
        if(existingUser){
            return next(CustomError("user already exist",404))
            }
        const genSalt =await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,genSalt)
        const newuser ={name,email,password:hashedPassword}
        // create user
        const user =await db.user.create({
            data:{
                ...newuser
            }
        })
      return res.status(201).json("user sucessfully created")
    } catch (error) {
        return next(CustomError("unable to create user",404))
    }
}

module.exports.loginUser =async(req,res)=>{
    try {
       const{email,password}=req.body
    //    check for email and password
      const{error} =validateLogin(req.body)
      if(error){
        return next(CustomError("please provide valid credentials"))
      }
    //    check if email exist
       const User =await db.user.findUnique({
        where:{
            email:req.body.email
        }
       })
       if(!User){
       return next(CustomError("invalid credential",404))
       }
    //   compare password
       const isMatch =await bcrypt.compare(password,User.password)
       if(isMatch){
            //    create token
        const token =jwt.sign({id:User.id,email},process.env.JWT_SECRET,{expiresIn:"1d"})
         return res.status(201).json({message:"user successfully logged in",User:User,token:token})
        
       }else{
        return next(CustomError("user not unathenticated",401))
       }
    }
    catch (error) {
        return next (CustomError("user not authenticated",401))
    }
}


// fetched user
module.exports.getUser =async(req,res)=>{
    try {
        const user =await db.user.findUnique({
            where:{
                id:req.User.id
            }
        })
    return res.status(200).json({user:user})
    } catch (error) {
        return next(CustomError("no user found with particular id",404))
    }

}