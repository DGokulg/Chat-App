import { GoogleLogin } from "@react-oauth/google"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const checkLogin = async () => {
            const localToken = localStorage.getItem("token")

            if (localToken) {
                try{
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`,
                        {
                            headers: {
                                Authorization: `Bearer ${localToken}`
                            }
                        }
                    )
                    console.log(response)
                    if(response.status === 200){
                        console.log("user already logged in")
                        const data = await response.json()
                        console.log(data)
                        navigate("/profile")
                    }
                }
                catch(e){
                    console.log(e)
                }
            }
        }
        checkLogin()
    }, [])

    const handleLogin = async (clientResponse) => {
        console.log(clientResponse)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/google`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ credential: clientResponse.credential })

            }
        )
        const data = await response.json()
        console.log(data)
        console.log(data.token)
        localStorage.setItem("token", data.token)
        navigate("/profile")
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

            {/* animated background blobs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-violet-600 opacity-50 blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-teal-400 opacity-40 blur-3xl animate-pulse [animation-delay:1.5s]" />
            <div className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full bg-pink-400 opacity-30 blur-3xl animate-pulse [animation-delay:3s]" />

            {/* card */}
            <div className="relative z-10 w-full max-w-sm bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl px-8 pt-10 pb-8 text-center animate-in fade-in zoom-in-95 duration-500">

                {/* logo */}
                <div className="flex items-center justify-center gap-2.5 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center shadow-lg shadow-violet-500/40">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.6 1.23 4.93 3.2 6.57-.15 1.3-.6 2.55-1.36 3.6a.5.5 0 00.5.8c2.02-.42 3.7-1.3 4.85-2.1.87.2 1.8.13 2.81.13 5.52 0 10-4.03 10-9S17.52 2 12 2z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">Chatty</span>
                </div>

                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Welcome to Chatty
                </h1>
                <p className="text-sm text-white/60 mb-7 leading-relaxed">
                    Real conversations, real time. Sign in to keep chatting.
                </p>

                {/* divider */}
                <div className="flex items-center gap-3 text-white/40 text-xs uppercase tracking-widest mb-5">
                    <span className="flex-1 h-px bg-white/10" />
                    <span>continue with</span>
                    <span className="flex-1 h-px bg-white/10" />
                </div>

                {/* google login */}
                <div className="flex justify-center mb-7 [&>div]:rounded-full [&>div]:overflow-hidden">
                    <GoogleLogin
                        theme="filled_black"
                        size="large"
                        shape="pill"
                        width="280"
                        onSuccess={clientResponse => { handleLogin(clientResponse) }}
                    />
                </div>

                {/* features */}
                <div className="flex justify-center flex-wrap gap-4 mb-6 pt-5 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-white/55">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-500 to-teal-400" />
                        Instant messaging
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/55">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-500 to-teal-400" />
                        Always in sync
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/55">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-500 to-teal-400" />
                        Secure sign-in
                    </div>
                </div>

                <p className="text-[13px] text-white/45">
                    Having trouble signing in?{" "}
                    <a href="#" className="text-violet-300 font-medium hover:underline">
                        Contact support
                    </a>
                </p>
            </div>

            <p className="relative z-10 mt-7 text-xs text-white/35 text-center">
                © {new Date().getFullYear()} Chatty · Terms · Privacy
            </p>
        </div>
    )
}

export default LoginPage