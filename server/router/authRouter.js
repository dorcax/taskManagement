const express =require("express")
const router =express.Router()
const userRouter =require("../controller/userController")



router.route("/google").post(userRouter.loginUser)



module.exports=router