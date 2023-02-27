import jwt from "jsonwebtoken";

export default function (req,res,next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: 'user is not authorized'})
        }

        const decodedData = jwt.verify(token, process.env.SECRET_JWT)
        req.userId = decodedData

        next()
    }catch (err) {
        res.status(403).json({message: err})
    }
}
