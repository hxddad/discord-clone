import Home from './pages/Home'
import Login from './pages/login/Login'
import HomeChat from './pages/chat/HomeChat'
import Chat from './pages/chat/Chat'
import Register from './pages/register/Register'
import { Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat/home" element={<HomeChat />} />
      <Route path='/chat/:id' element={<Chat />} />
    </Routes>
  )
}

export default App
