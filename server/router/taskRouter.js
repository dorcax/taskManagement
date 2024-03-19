const express =require("express")
const router =express.Router()

const {createTask,getTask, getAllTask, updateTask, deleteTask} =require("../controller/taskController")



// router.route("/:userId",upload.single("image")).post(createTask)
router.post("/",createTask)
router.get("/:taskId",getTask)
router.get("/",getAllTask)
router.patch("/:taskId",updateTask)
router.delete("/:taskId",deleteTask)

module.exports=router