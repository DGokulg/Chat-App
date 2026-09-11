import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import UserContext from "../context/UserContext"
const HomePage = () => {
    const navigate = useNavigate()
    const { user, setUser, allUsers, setAllUsers , setReceiver } = useContext(UserContext)


    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#1a1638] to-[#24243e]">

            {/* header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white/[0.04] backdrop-blur-xl border-b border-white/10">
                <div className="flex items-center justify-center gap-2.5 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center shadow-lg shadow-violet-500/40">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.6 1.23 4.93 3.2 6.57-.15 1.3-.6 2.55-1.36 3.6a.5.5 0 00.5.8c2.02-.42 3.7-1.3 4.85-2.1.87.2 1.8.13 2.81.13 5.52 0 10-4.03 10-9S17.52 2 12 2z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">Chatty</span>
                </div>

                <button
                    className="text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition"
                    onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/")
                    }}
                >
                    Log out
                </button>
            </header>

            {/* main */}
            <main className="max-w-2xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                        Welcome back, {user ? user.name : "....."}
                    </h1>
                    <p className="text-white/50 text-sm">Pick up a conversation or start a new one.</p>
                </div>

                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                        <h2 className="text-white font-semibold text-base">People</h2>
                        <span className="text-xs text-white/60 bg-white/10 rounded-full px-2.5 py-1">
                            {allUsers.length}
                        </span>
                    </div>

                    <div className="divide-y divide-white/5">
                        {
                            allUsers.length != 0 ? allUsers.filter((u) => u._id !== user?._id).map((u, index) => {
                                return (
                                    <div key={u._id} className="px-2">
                                        <nav>
                                            <p
                                                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer hover:bg-white/[0.06] transition"
                                                onClick={() => {
                                                    // console.log(u)
                                                    setReceiver(u)
                                                    navigate(`/chat/${u._id}`)  //placing the receiver_id in the params
                                                }}
                                            >
                                                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                                    {u.name != user?.name ? u.name.charAt(0).toUpperCase() : ""}
                                                </span>
                                                <span className="text-white/90 text-sm font-medium truncate">
                                                    {u.name != user?.name ? u.name : ""}
                                                </span>
                                            </p>
                                        </nav>
                                    </div>
                                )
                            }) : <p className="px-6 py-8 text-center text-white/40 text-sm">No users found.</p>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomePage