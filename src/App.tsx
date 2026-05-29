import './App.css'
import Login from './login/Login'
import Chat from './chat/Chat'
import { Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default App