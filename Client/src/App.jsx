import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { Routes,Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <>
        <Routes>
          <Route path="/" Component={LoginPage}/>
          <Route path="/profile" Component={HomePage}/>
          <Route path="/chat/:userId" Component={ChatPage}/>
        </Routes>
    
    </>
  )
}

export default App
