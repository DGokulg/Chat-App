import Messages from "../models/Messages.js"

export const putMessage = async (req,res)=>{
    try{
        const {senderId,receiverId,message} = req.body
        if(senderId === receiverId){
            return res.status(400).json({message: "Sender and receiver cannot be the same"})
        }
        const newMessage = await Messages.create(
            {
                senderId : senderId,
                receiverId : receiverId,
                message : message
            }
        )
        res.status(201).json(newMessage)
    }
    catch(e){
        res.status(500).json({message: "Error creating message"})
    }
}

export const getMessage = async (req,res)=>{
    try{
        const {senderId,receiverId} = req.query
        const messages = await Messages.find(
            {
                $or : [
                    {senderId:senderId,receiverId:receiverId},
                    {senderId:receiverId,receiverId:senderId}
                ]
            }
        )
        res.status(200).json(messages)
    }
    catch(e){
        res.status(500).json({message: "Error fetching messages"})
    }
}


