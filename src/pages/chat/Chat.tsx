import { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { Navigate } from 'react-router-dom';
import ServerList from '../../components/ServerList';


const socket = io("http://localhost:4000", {
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
  
export function Chat() {

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  


  useEffect(() => {
    socket.on("receive-message", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  function onSubmit(event: any) {
    event.preventDefault();

    if (!value.trim()) return;

    setIsLoading(true);

    const newMessage = {
      author: "Yazan",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: value,
      color: "#5865f2",
    };

    socket.timeout(5000).emit("send-message", newMessage, (err: any) => {
      setIsLoading(false);

      if (err) {
        console.error("Message failed to send");
        return;
      }

      setValue("");
    });
  }
  

  const [chatMessages, setChatMessages] = useState(messages);

  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    
    <main className="grid h-screen grid-cols-[64px_minmax(0,1fr)] overflow-hidden bg-[#313338] text-[#f5f6fa] min-[720px]:grid-cols-[72px_220px_minmax(0,1fr)] min-[1050px]:grid-cols-[72px_260px_minmax(0,1fr)_240px]">

      <ServerList />
      
      <aside className="hidden min-h-0 flex-col border-r border-white/6 bg-[#2b2d31] min-[720px]:flex">
        <header className="flex min-h-[72px] items-center justify-between border-b border-black/25 bg-[#2b2d31] px-[18px] pt-[18px] pb-4">
          <div>
            <span className="mb-1 block text-[11px] font-bold tracking-[0.08em] text-[#b5bac1] uppercase">Workspace</span>
            <h1 className="m-0 text-lg leading-[1.1]">Design Den</h1>
          </div>
        </header>

        <nav className="flex-1 px-2.5 py-[18px]" aria-label="Text channels">
          <p className="mx-2 mt-0 mb-2.5 text-xs font-extrabold tracking-[0.04em] text-[#949ba4] uppercase">Text Channel</p>

          <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg border-0 bg-[#404249] px-3 py-2.5 text-left text-[15px] text-white transition" type="button">
            <span className="text-xl text-[#80848e]" aria-hidden="true">#</span>
            general
          </button>
        </nav>

        <div className="flex items-center gap-2.5 bg-[#232428] p-3.5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#5865f2] font-extrabold text-white">Y</div>
          <div>
            <strong className="block text-sm">Yazan</strong>
            <span className="mt-0.5 block text-xs text-[#b5bac1]">Available</span>
          </div>
        </div>
      </aside>

      <section className="flex min-h-0 min-w-0 flex-col bg-[#313338]">
        <header className="flex min-h-[72px] flex-col justify-center border-b border-black/25 bg-[#313338] px-4 py-3.5 min-[720px]:px-6 min-[720px]:py-4">
          <div className="flex items-center gap-2">
            <span className="text-[26px] font-bold text-[#80848e]">#</span>
            <h2 className="m-0 text-xl">general</h2>
          </div>
          <p className="mt-1 mb-0 text-sm text-[#b5bac1]">One-server, one-channel prototype for quick project updates.</p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-[18px] min-[720px]:p-6 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#1e1f22] [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="mx-auto mb-6 w-fit rounded-full bg-[#232428] px-3 py-1.5 text-xs font-bold text-[#b5bac1]">May 27, 2026</div>

          {chatMessages.map((message, index) => (
            <article className="flex gap-3.5 rounded-[10px] px-2 py-3 hover:bg-white/[0.035]" key={index}>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-extrabold text-white" style={{ backgroundColor: message.color }}>
                {message.author[0]}
              </div>

              <div className="min-w-0">
                <div className="mb-1 flex items-baseline gap-2">
                  <strong className="text-[15px]">{message.author}</strong>
                  <span className="text-xs text-[#949ba4]">{message.time}</span>
                </div>
                <p className="m-0 leading-normal text-[#dbdee1]">{message.text}</p>
              </div>
            </article>
          ))}
        </div>

        <form className="mx-3 mb-3.5 flex items-center gap-2.5 rounded-[14px] bg-[#383a40] p-3 min-[720px]:mx-6 min-[720px]:mb-6" onSubmit={onSubmit}>
          <button className="grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-[10px] border-0 bg-[#4e5058] text-[22px] text-white transition hover:bg-[#5c5f68]" type="button" aria-label="Add attachment">
            +
          </button>

          <input
            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#f5f6fa] outline-none placeholder:text-[#949ba4]"
            aria-label="Message #general"
            placeholder="Message #general"
            value={value}
            onChange={ e => setValue(e.target.value) }
          />

          <button className="grid cursor-pointer place-items-center rounded-[10px] border-0 bg-[#5865f2] px-3 py-[9px] font-bold text-white transition hover:-translate-y-px hover:bg-[#4752c4] min-[720px]:px-3.5" type="submit" disabled={ isLoading }>
            Send
          </button>
        </form>
      </section>

      <aside className="hidden min-h-0 border-l border-white/6 bg-[#2b2d31] px-3.5 py-[22px] min-[1050px]:block">
        <p className="mx-2 mt-0 mb-2.5 text-xs font-extrabold tracking-[0.04em] text-[#949ba4] uppercase">Online - {members.length}</p>

        {members.map((member) => (
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2.5 hover:bg-[#35373c]" key={member.name}>
            <div className="h-2.5 w-2.5 rounded-full bg-[#23a559] shadow-[0_0_0_3px_rgba(35,165,89,0.15)]" />
            <div>
              <strong className="block text-sm">{member.name}</strong>
              <span className="mt-0.5 block text-xs text-[#b5bac1]">{member.status}</span>
            </div>
          </div>
        ))}
      </aside>
    </main>
  )
}

export default Chat
