import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import UserContext from "../context/UserContext"
import "../HomePage.css"
const HomePage = () => {
    const navigate = useNavigate()
    const { user, setUser, allUsers, setAllUsers , setReceiver } = useContext(UserContext)


    return (
        <div className="home-page">
            <header className="home-header">
                <div className="header-left">
                    <div className="logo-mark">A</div>
                    <span className="header-brand">Portal</span>
                </div>

                <button className="logout-btn" onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/")
                }}>Log out</button>
            </header>

            <main className="home-main">
                <div className="welcome-block">
                    <h1 className="welcome-title">Welcome back, {user ? user.name : "....."}</h1>
                    <p className="welcome-subtitle">Pick up a conversation or start a new one.</p>
                </div>

                <div className="users-panel">
                    <div className="users-panel-header">
                        <h2 className="users-title">People</h2>
                        <span className="users-count">{allUsers.length}</span>
                    </div>

                    <div className="users-list">
                        {
                            allUsers.length != 0 ? allUsers.filter((u) => u._id !== user?._id).map((u, index) => {
                                return (
                                    <div key={u._id} className="user-row">
                                        <nav className="user-row-nav">
                                            <p className="user-row-item" onClick={() => {
                                                // console.log(u)
                                                setReceiver(u)
                                                navigate(`/chat/${u._id}`)  //placing the receiver_id in the params
                                            }}>
                                                <span className="user-avatar">
                                                    {u.name != user?.name ? u.name.charAt(0).toUpperCase() : ""}
                                                </span>
                                                <span className="user-name">{u.name != user?.name ? u.name : ""}</span>
                                            </p>
                                        </nav>
                                    </div>
                                )
                            }) : <p className="no-users">No users found.</p>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomePage
