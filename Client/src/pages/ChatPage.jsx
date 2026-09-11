import UserContext from "../context/UserContext"
import { useContext, useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"

import SocketContext from "../context/SocketContext"
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
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#0f0c29] via-[#1a1638] to-[#24243e]">

      {/* header */}
      <header className="flex items-center gap-3 px-5 py-4 bg-white/[0.04] backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-violet-500/30 flex-shrink-0">
          {receiver?.name ? receiver.name.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="min-w-0">
          <h1 className="text-white font-semibold text-base truncate">{receiver?.name || "..."}</h1>
          <p className="text-white/50 text-xs truncate">{user?.name} · connected</p>
        </div>
      </header>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
        {
          history.map((msg,index) => {
            const isMine = msg.senderId === user?._id
            return (
              <div key={index} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                    isMine
                      ? "bg-gradient-to-br from-violet-600 to-violet-500 text-white rounded-br-sm"
                      : "bg-white/10 text-white/90 backdrop-blur-sm rounded-bl-sm border border-white/10"
                  }`}
                >
                  <p className="break-words">{msg.message}</p>
                </div>
              </div>
              )
          })
        }
        <div ref={messagesEndRef} />
      </div>

      {/* input bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.04] backdrop-blur-xl border-t border-white/10">
        <input
          type="text"
          className="flex-1 bg-white/10 text-white placeholder-white/40 text-sm rounded-full px-4 py-2.5 outline-none border border-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20 transition"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-gradient-to-br from-violet-600 to-teal-400 text-white text-sm font-medium rounded-full px-5 py-2.5 shadow-md shadow-violet-500/30 hover:opacity-90 active:scale-95 transition"
          onClick={() => {
            setHistory((prev)=>[...prev,{
              message : message,
              senderId: user?._id
            }])
            sendMessage()
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPage