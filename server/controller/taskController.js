const db = require("../connection/db")
const cloudinary = require("../util/cloudinary")


// create task

module.exports.createTask = async (req, res) => {


    try {
        const { title, description, status } = req.body

        // const result = await cloudinary.uploader.upload(req.file.path)
        // // console.log(req.files)
        const id = req.User.id
        const task = await db.task.create({
            data: {
                title,
                description,
                status,
                // image:{
                // create:{
                //     image_id:result.public_id,
                //     image_url:result.secure_url
                // }
                // },
                user: {
                    connect: {
                        id: id
                    }
                }
            }
        })
        res.status(201).json(task)

    }
    catch (error) {
        res.status(404).json({ error: error })
    }



}


// get one user task
module.exports.getTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const task = await db.task.findUnique({
            where: {
                id: +taskId,
                userId: req.User.id
            },
            select: {
                title: true,
                description: true,
                user: true,
                image: true
            }
        })
        res.status(200).json({ task: task })
    } catch (error) {
        res.status(404).json("not can't get the user task ")

    }

}


// get all single user and  include all their  task
module.exports.getAllTask = async (req, res) => {
    try {
        const task = await db.user.findUnique({
            where: { id: req.User.id },
            select: {
                // image:true,
                task: {
                    select: {
                        id: true,
                        title: true, description: true, status: true, dueDate: true,
                        image: true
                    }
                },
                image:true
            },

        })
        res.status(200).json({ task: task })
    } catch (error) {
        res.status(404).json("unable to get a user all tasks")
    }

}
// update oonly one task

module.exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const { title, description, } = req.body
        console.log(req.User.id)
        const updateTask = await db.task.update({
            where: { id: +taskId, userId: req.User.id },
            data: {
                title,
                description,

            },

            select: {
                title: true,
                description: true,
                user: true,
                image: true 

            }
        })
        res.status(200).json({
            Task: updateTask
        })
    } catch (error) {
        res.status(404).json({ error: "unable to update the task" })
    }

}
// delete task
module.exports.deleteTask =async(req,res)=>{
  try {
    const {taskId} =req.params
    const task =await db.task.delete({
        where:{id:+taskId,userId:req.User.id}
    })  
    // console.log("deleted")
    res.status(200).json("deleted") 
  } catch (error) {
    res.status(404).json({error:"unable to delete the task"})
  }
}
