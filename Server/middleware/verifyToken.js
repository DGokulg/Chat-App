import JWT from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({
            message: "no header"
        })
    }
    const token = authorization.split(" ")[1]
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRETE)
        req.user = decoded
        next()
    }
    catch (e) {
        res.status(401).json({
            message: "invalid token"
        })
    }

}

export default verifyToken