const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(404).json("no token found")
    }
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.User = decoded
    next()


}
module.exports =auth