import './App.css'
import Login from './login/Login'
import Chat from './chat/Chat'
import Register from './register/Register'
import { Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default App
