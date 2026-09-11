import { io } from "socket.io-client";
import SocketContext from "./SocketContext";
import { useEffect, useState ,useContext} from "react";
import UserContext from "./UserContext";

const SocketProvider = ({ children }) => {
    const {user} = useContext(UserContext)
    const [socket, setSocket] = useState(null)

    useEffect(() => {

        const newsocket = io(`${import.meta.env.VITE_API_URL}/`,
            {
                auth: {
                    token: localStorage.getItem("token")
                }
            })

        setSocket(newsocket)
        newsocket.on("connect", () => {
            console.log("connect with the socket ID : ", newsocket.id)
        })
        newsocket.emit("register_user",{
            userId : user?._id,
        })
        newsocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
        return (() => {
            newsocket.disconnect()
        })



    }, [user])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider


