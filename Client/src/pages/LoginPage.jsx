import { GoogleLogin } from "@react-oauth/google"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../LoginPage.css"

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
       <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <div className="logo-mark">A</div>
                </div>

                <h1 className="auth-title">Sign in to your account</h1>
                <p className="auth-subtitle">Welcome back. Please continue with Google.</p>

                <div className="auth-divider" />

                <div className="google-btn-wrap">
                    <GoogleLogin
                        theme="outline"
                        size="large"
                        onSuccess={clientResponse => { handleLogin(clientResponse) }}
                    />
                </div>

                <p className="auth-help">
                    Having trouble signing in? <a href="#" className="auth-link">Contact support</a>
                </p>
            </div>

            <p className="auth-footer">© {new Date().getFullYear()} Your Company · Terms · Privacy</p>
        </div>
    )
}

export default LoginPage
