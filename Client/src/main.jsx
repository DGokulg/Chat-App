import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import UserProvider from './context/UserProvider.jsx'
import SocketProvider from './context/SocketProvider.jsx'


const OAUTH_CLIENT = import.meta.env.VITE_OAUTH;

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={OAUTH_CLIENT}>
        <UserProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  // </StrictMode>
)
