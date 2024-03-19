const express =require("express")
const router =express.Router()
const{createImage, updateImage} =require("../controller/imageController")
const upload =require("../multer")






router.post("/:taskId",upload.single("image"),createImage)
router.patch("/:taskId/:imageId",upload.single("image"),updateImage)
 


module.exports =router