const express =require("express")
const router =express.Router()
const upload =require("../multer")
const Authentication =require("../middleware/auth")

const {createTask,getTask, getAllTask, updateTask, deleteTask} =require("../controller/taskController")



router.post("/",Authentication,upload.single("image"),createTask)
// router.post("/",createTask)
router.get("/:taskId",Authentication,getTask)
router.get("/",Authentication,getAllTask)
router.patch("/:taskId/:imageId",Authentication,upload.single("image"),updateTask)
router.delete("/:taskId",Authentication,deleteTask)

module.exports=router