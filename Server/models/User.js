import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        google_id :{
            type : String,
            required : true,
        },
        name : {
            type : String,
            required : true,
            unique : true
        },
        role:{
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        bio : {
            type : String
        },
        dept : {
            type : String
        },
        passed_out :{
            type : String
        }
        
    }
)

const User = mongoose.model("Users",UserSchema)

export default User