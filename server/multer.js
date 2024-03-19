const multer =require("multer")
const path =require("path")



// specify the disk storage


const storage =multer.diskStorage({
    // destination:path.join(__dirname,"uploads"),
    filename: function (req, file, cb) {
        cb(null,new Date().getTime() + path.extname(file.originalname))
    }
})
// file validation
const fileFilter=(req,file,cb)=>{
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" ||file.mimetype=="image/jpg") {
        cb(null,true)
    }
    else {
        cb({message:"unsupported file format"},false)
    }
}

const upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024},
    fileFilter:fileFilter
})
// const storage = multer.memoryStorage(); // Store files in memory for Cloudinary upload
// const upload = multer({ storage: storage });

module.exports =upload