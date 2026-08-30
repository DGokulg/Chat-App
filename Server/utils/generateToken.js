import JWT from "jsonwebtoken";

const generateToken = (user) =>{
    const token = JWT.sign(
        {
            id : user._id,
            name : user.name,
            email : user.email,
        },
        process.env.JWT_SECRETE,
        {
            expiresIn : "1d"
        }
    )
    return token;
}

export default generateToken