const express =require("express")
const router =express.Router()
const userRouter =require("../controller/userController")
const Authentication =require("../middleware/auth")



router.route("/")
.post(userRouter.createUser)
.get(Authentication,userRouter.getUser)
router.route("/login").post(userRouter.loginUser)




module.exports=router