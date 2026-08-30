import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        senderId:{
            type : String,
            required : true
        },
        receiverId:{
            type :String,
            required : true
        },
        message :{
            type : String
        }
    }
)

const Messages = mongoose.model("Messages",MessageSchema)

export default Messages