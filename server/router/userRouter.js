const express =require("express")
const router =express.Router()
const userRouter =require("../controller/userController")



router.route("/").post(userRouter.createUser)
router.route("/login").post(userRouter.loginUser)



module.exports=router