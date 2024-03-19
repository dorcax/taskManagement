const db =require("../connection/db")

const cloudinary = require("../util/cloudinary")

// create an image 
module.exports.createImage=async(req,res)=>{
    try {
       
    const{taskId} =req.params
    const result =await cloudinary.uploader.upload(req.file.path)
    const image2 =await db.image.create({
     data:{
           
            image_id:result.public_id,
            image_url:result.secure_url,
            task:{
                connect:{
                    id:+taskId
                }
            },
            user:{
                connect:{
                    id:req.User.id
                }
            }

        }
    

    })
    res.status(201).json(image2)
    console.log("created")
    } catch (error) {
        res.status(404).json({error:error})
    }
    
}

// update an image

module.exports.updateImage =async(req,res)=>{
    const{taskId,imageId}=req.params
    const result= await cloudinary.uploader.upload(req.file.path)
    const image2 =db.image.update({
        where:{
            id:+imageId,taskId:+taskId,userId:req.User.id
        },
        data:{
            image_id:result.public_id,
            image_url:result.secure_url
        } 
    })
    res.status(200).json(image2)
}