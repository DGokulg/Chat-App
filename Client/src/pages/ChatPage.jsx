import UserContext from "../context/UserContext"
import { useContext, useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"

import SocketContext from "../context/SocketContext"
import "../ChatPage.css"
const ChatPage = () => {
  const { user, receiver, setReceiver } = useContext(UserContext)

  const socket = useContext(SocketContext)

  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])

  const { userId } = useParams()

  const messagesEndRef = useRef(null)

  useEffect(() => {
    const updateReceiver = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user_id/${userId}`)
      const data = await response.json()
      // console.log(data)
      setReceiver(data.user)

    }
    updateReceiver()
  }, [userId])

  useEffect(() => {

    if (!socket) return;

    socket.on("receive_message", (message) => {
      console.log("Message received:", message);
      setHistory((prev)=>[...prev,message])
    });

    return () => {
      socket.off("receive_message");
    };

  }, [socket]);

  useEffect(() => {
    if (!user || !userId) {
      return;
    }
   
    const getHistory = async () => {
      try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/message/get/msg?senderId=${user._id}&receiverId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        const data = await response.json()
        setHistory(data)
      }
      catch(e){
        console.log(e)
      }
    }
    getHistory()
  }, [user, userId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

const sendMessage = async () => {

  // if (!user?._id) {
  //   console.log("User is not loaded yet")
  //   return
  // }

  // if (!receiver?._id) {
  //   console.log("Receiver is not loaded yet")
  //   return
  // }

  // if (!socket) {
  //   console.log("Socket is not connected")
  //   return
  // }

  socket.emit("send_message", {
    sender_id: user._id,
    receiver_id: receiver._id,
    message: message ? message : "empty"
  })
}

  return (
     <div className="chat-page">
      <header className="chat-header">
        <div className="chat-header-avatar">
          {receiver?.name ? receiver.name.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="chat-header-info">
          <h1 className="chat-header-name">{receiver?.name || "..."}</h1>
          <p className="chat-header-sub">{user?.name} · connected</p>
        </div>
      </header>

      <div className="chat-messages">
        {
          history.map((msg,index) => {
            const isMine = msg.senderId === user?._id
            return (
              <div key={index} className={`chat-row ${isMine ? "chat-row-mine" : "chat-row-theirs"}`}>
                <div className={`chat-bubble ${isMine ? "chat-bubble-mine" : "chat-bubble-theirs"}`}>
                  <p className="chat-bubble-text">{msg.message}</p>
                </div>
              </div>
              )
          })
        }
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-bar">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="chat-send-btn" onClick={() => {
          setHistory((prev)=>[...prev,{
            message : message,
            senderId: user?._id
          }])
          sendMessage()
        }}>Send</button>
      </div>
    </div>
  )
}

export default ChatPage