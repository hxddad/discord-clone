import { useState } from 'react'
import './Chat.css'
import { io } from "socket.io-client";
import { Navigate } from 'react-router-dom';


const socket = io("http://localhost:5000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});
const messages = [
  {
    author: 'Yazan',
    time: '10:24 AM',
    text: 'This is the prototype channel for our Discord-style app.',
    color: '#5865f2',
  },
  {
    author: 'Maya',
    time: '10:27 AM',
    text: 'Looks clean. We can add real-time messaging later.',
    color: '#57f287',
  },
  {
    author: 'Omar',
    time: '10:31 AM',
    text: 'For now, one server and one channel is enough for the demo.',
    color: '#fee75c',
  },
]

const members = [
  { name: 'Yazan', status: 'Available' },
  { name: 'Maya', status: 'Online' },
  { name: 'Omar', status: 'Online' },
]

function Chat() {
  const [draft, setDraft] = useState('')
  const [chatMessages] = useState(messages)

  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    
    <main className="chat-app">
      <aside className="server-rail" aria-label="Servers">
        <button className="server-icon active" type="button" aria-label="Design Den">
          D
        </button>
      </aside>
      

      <aside className="channel-panel">
        <header className="workspace-header">
          <div>
            <span className="eyebrow">Workspace</span>
            <h1>Design Den</h1>
          </div>
        </header>

        <nav className="channel-list" aria-label="Text channels">
          <p className="section-label">Text Channel</p>

          <button className="channel active" type="button">
            <span aria-hidden="true">#</span>
            general
          </button>
        </nav>

        <div className="profile-card">
          <div className="avatar you">Y</div>
          <div>
            <strong>Yazan</strong>
            <span>Available</span>
          </div>
        </div>
      </aside>

      <section className="conversation">
        <header className="chat-header">
          <div>
            <span className="channel-mark">#</span>
            <h2>general</h2>
          </div>
          <p>One-server, one-channel prototype for quick project updates.</p>
        </header>

        <div className="message-feed">
          <div className="date-chip">May 27, 2026</div>

          {chatMessages.map((message, index) => (
            <article className="message" key={index}>
              <div className="avatar" style={{ backgroundColor: message.color }}>
                {message.author[0]}
              </div>

              <div className="message-body">
                <div className="message-meta">
                  <strong>{message.author}</strong>
                  <span>{message.time}</span>
                </div>
                <p>{message.text}</p>
              </div>
            </article>
          ))}
        </div>

        <form className="composer" /* onSubmit={handleSend} */>
          <button className="attach-button" type="button" aria-label="Add attachment">
            +
          </button>

          <input
            aria-label="Message #general"
            placeholder="Message #general"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />

          <button className="send-button" type="submit">
            Send
          </button>
        </form>
      </section>

      <aside className="member-panel">
        <p className="section-label">Online - {members.length}</p>

        {members.map((member) => (
          <div className="member" key={member.name}>
            <div className="status-dot" />
            <div>
              <strong>{member.name}</strong>
              <span>{member.status}</span>
            </div>
          </div>
        ))}
      </aside>
    </main>
  )
}

export default Chat
