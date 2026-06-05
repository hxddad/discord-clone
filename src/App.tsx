import Home from './pages/Home'
import Login from './pages/login/Login'
import Chat from './pages/chat/Chat'
import Register from './pages/register/Register'
import { Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default App
