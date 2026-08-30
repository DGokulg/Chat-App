import express from "express"
import connectDb from "../config/db.js"
import routes from "../routes/auth.routes.js"
import http from "http"
import { Server } from "socket.io"
import Messages from "../models/Messages.js"
import dotenv from "dotenv"
import cors from "cors"


dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
app.use(cors({
    origin: "*"
}))
app.use(express.json())

// app.use((req, res, next) => {
//     console.log("METHOD:", req.method)
//     console.log("URL:", req.url)
//     console.log("CONTENT TYPE:", req.headers["content-type"])
//     console.log("BODY:", req.body)

//     next()
// })
app.use(routes)
const onlineUsers = new Map()
io.on("connection", (socket) => {
    console.log("user connected with the id : ", socket.id)
    socket.on("connect", () => {
        console.log("hello")
    })
    socket.on("disconnect", () => {
        console.log(socket.id, " has disconnected")
    })
    socket.on("register_user", ({ userId }) => {
        onlineUsers.set(userId, socket.id)
        socket.userId = userId
        console.log(onlineUsers)
    })
    socket.on("send_message", async (msg) => {
        console.log("message received : ", msg)
        const response = await Messages.create(
            {
                senderId : msg.sender_id,
                receiverId : msg.receiver_id,
                message : msg.message
            }
        )
        console.log(response)
        const isOnline = onlineUsers.get(msg.receiver_id)
        if(isOnline){
            io.to(isOnline).emit("receive_message",response)
        }

    })
    return () => {
        onlineUsers.delete(socket.userId)
        socket.disconnect();
    };
})

const PORT = process.env.PORT || 5000

await connectDb().catch(e => { console.log(e) })
server.listen(PORT, () => {
    console.log("Server is running!")
})
