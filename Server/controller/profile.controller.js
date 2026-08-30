import User from "../models/User.js"

export const getProfile = async (req,res) =>{
    // console.log(req.user)
    try{
        const user = await User.findOne({email : req.user.email})
        res.status(200).json({user})
    }
    catch(e){
        res.status(401).json({
            message : "failed to get profile"
        })
    }
}

export const getAllUsers = async (req,res) =>{
    try{
        const users = await User.find()
        res.status(200).json({users})
    }
    catch(e){
        res.status(401).json({
            message : "failed to get users"
        })
    }
}

export const getUserById = async (req,res) =>{
    try{
        const user = await User.findOne({_id : req.params.userId})
        if(!user){
            return res.status(404).json({message : "user not found"})
        }
        res.status(200).json({user})
    }
    catch(e){
        res.status(401).json({message : "failed to get the user!"})
    }
}

