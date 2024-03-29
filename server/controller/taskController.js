const db = require("../connection/db")
const cloudinary = require("../util/cloudinary")
const upload =require("../multer")
const {CustomError} =require("../middleware/CustomError")
const validateTask = require("../validationJoi/TaskValidation")


// create task

module.exports.createTask = async (req, res,next) => {


    try {
        const{error}=validateTask(req.body)
        if(error){
            return next (CustomError(error.details[0].message,400))
        }
        const { title, description, status } = req.body
        if (!req.file) {
            return next(CustomError('No file uploaded',404));
        }
        const result = await cloudinary.uploader.upload(req.file.path)
        // console.log(req.files.path)
        const id = req.User.id
        const task = await db.task.create({
            data: {
              ...req.body,
                image:{
                create:{
                    image_id:result.public_id,
                    image_url:result.secure_url,

                    User: {
                        connect: {
                          id: req.User.id
                        },
                      },

                }
            },
                user: {
                    connect: {
                      id: req.User.id,
                    },
                  },
            },
            include:{
                image:true
            }
        })

         return res.status(201).json({task:task})
 
    }
    catch(error){
        return next(CustomError("error creating task",401))
    }
}

// // get one user task
module.exports.getTask = async (req, res,next) => {
    try {
        const { taskId } = req.params
        const task = await db.task.findUnique({
            where: {
                id: +taskId,
                userId: req.User.id
            },
            include:{
                image:true
            }
        })
      return  res.status(200).json({ task: task })
    } catch (error) {
        return next(CustomError("not can't get the user task ",404))

    }

}


// get all single user and  include all their  task
module.exports.getAllTask = async (req, res,next) => {
    try {
        const task = await db.task.findMany({
            where: { userId: req.User.id },
        include:{
            image:true
        }

            

        })
        return res.status(200).json({ task: task })
    } catch (error) {
        return next (CustomError("unable to get a user all tasks",404))
    }

}
// update oonly one task

module.exports.updateTask = async (req, res,next) => {
    try {
        const{error}=validateTask(req.body)
        if(error){
            return next (CustomError(error.details[0].message,400))
        }
        const { taskId,imageId } = req.params
        const { title, description, status} = req.body
        console.log(req.User.id)
        const result =await cloudinary.uploader.upload(req.file.path)
        const updateTask = await db.task.update({
            where: { id: +taskId, userId: req.User.id },
            data: {
                ...req.body,
                image:{
                    update:{
                        where:{
                            id:+imageId
                        },
                        data:{
                            image_url:result.secure_url
                        }
                    }
                   
                   
                }
               
            },

         include:{
            image:true
         }
        })
         return res.status(200).json({
        task: updateTask
        })
} catch (error) {
       return next(CustomError("unable to update the task",404)) 
    }

}
// delete task
module.exports.deleteTask =async(req,res,next)=>{
  try {
    const {taskId} =req.params
    const task =await db.task.delete({
        where:{id:+taskId,userId:req.User.id}
    })  
    // console.log("deleted")
    return res.status(200).json(task) 
  } catch (error) {
    return next(CustomError("error in deleting the task"))
  }
}
