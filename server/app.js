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

// app.use(cors())
const corsOptions ={
  origin: ["http://localhost:5173", "https://task-managementweb.netlify.app"],
  credentials: true, // Access-Control-Allow-Credentials header
  optionsSuccessStatus: 200, // HTTP status code for successful OPTIONS requests
  methods: "GET, POST, PUT, DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
  }
  app.use(cors(corsOptions));
  // Middleware to allow CORS

app.use("/user",userRouter)
app.use("/task",taskRouter)

app.use(ErrorHandler)




app.listen(port,()=>{
    console.log(` server is listening on port ${port}` )
})
