const express =require("express")
const app =express()
const port =process.env.PORT||4000
require("dotenv").config()
const userRouter =require("./router/userRouter")
const taskRouter=require("./router/taskRouter")

const cors =require("cors") 
const ErrorHandler = require("./middleware/ErrorHandler")



// const fileupload =require("express-fileupload")


app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cors())
// const corsOptions ={
//     origin:'https://task-managementweb.netlify.app', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
//   }
//   app.use(cors(corsOptions));

app.use("/user",userRouter)
app.use("/task",taskRouter)

app.use(ErrorHandler)




app.listen(port,()=>{
    console.log(` server is listening on port ${port}` )
})
