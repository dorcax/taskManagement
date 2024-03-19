const express =require("express")
const app =express()
const port =process.env.PORT||4000
require("dotenv").config()
const userRouter =require("./router/userRouter")
const taskRouter=require("./router/taskRouter")
const isAuthenticated =require("./middleware/auth")
const imageRouter =require("./router/imageRouter")



// const fileupload =require("express-fileupload")


app.use(express.urlencoded({extended:true}))

app.use(express.json())


app.use("/user",userRouter)
app.use("/task",isAuthenticated,taskRouter)
app.use("/image",isAuthenticated,imageRouter)
// app.use(fileupload({useTempFiles:true}))



app.listen(port,()=>{
    console.log(` server is listening on port ${port}` )
})
