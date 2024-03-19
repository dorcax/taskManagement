const db =require("../connection/db")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")

// an endpoint to register user
module.exports.createUser =async(req,res)=>{
    try {
        const {name,email,password} =req.body
        const genSalt =await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,genSalt)
        const newuser ={name,email,password:hashedPassword}
        // create user
        const user =await db.user.create({
            data:{
                ...newuser
            }
        })
       res.status(201).json("user sucessfully created")
    } catch (error) {
        res.status(404).json("unable to create user")
    }
}

module.exports.loginUser =async(req,res)=>{
    try {
       const{email,password}=req.body
    //    check for email and password
       if(!email ||!password){
        res.status(401).json("please enter your email and password")
       } 
    //    check if email exist
       const User =await db.user.findUnique({
        where:{
            email:req.body.email
        }
       })
       if(!User){
        res.status(401).json("invalid credential")
       }
    //   compare password
       const isMatch =await bcrypt.compare(password,User.password)
       if(isMatch){
            //    create token
        const token =jwt.sign({id:User.id,email},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(401).json({message:"user successfully logged in",User,token})
        
       }else{
        res.status(401).json("user not unathenticated")
       }
    }
    catch (error) {
        res.status(401).json("user not authenticated")
    }
}