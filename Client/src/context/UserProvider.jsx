import UserContext from './UserContext'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [receiver ,setReceiver] = useState(null)
    const [allUsers, setAllUsers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const checkSession = async () => {
            const localToken = localStorage.getItem("token")
            try {
                const response = await fetch("http://localhost:5000/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${localToken}`
                        }
                    }
                )
                const users = await fetch("http://localhost:5000/users")
                const usersData = await users.json()
                setAllUsers(usersData.users)
                if (response.status === 401) {
                    navigate("/")
                }
                if (response.status === 200) {
                    const data = await response.json()
                    setUser(data.user)
                }
            }
            catch (e) {
                console.log(e)
            }
        }


        checkSession()
    }, [])


    return (
        <UserContext.Provider value={
            { user, setUser, allUsers, setAllUsers,receiver,setReceiver }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider