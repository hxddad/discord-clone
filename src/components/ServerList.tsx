import { useState, useEffect } from "react";
import ServerIcon from "./ServerIcon";
import CreateServer from "./CreateServer";
import { Link } from "react-router";

function ServerList() {

  interface Server {
    _id: string;
    name: string;
  }

  const [servers, setServers] = useState<Server[]>([]);
  const [showCreateServer, setShowCreateServer] = useState(false);
  const token = localStorage.getItem("token");

  
    async function fetchServers() {
      const res = await fetch("http://localhost:5000/api/servers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setServers(data);
    }
    
    useEffect(() => {
      fetchServers();
    }, [token]);

 return (
    <div className="flex flex-col items-center space-y-2 p-2">
   

      {/* create new server button */}

      <button 
        className="rounded-xl bg-gray-800 w-12 h-12 flex items-center content-center justify-center text-white text-lg font-bold cursor-pointer hover:bg-gray-700"
        onClick={() => setShowCreateServer(true)}
        > +
      </button>
      
      {showCreateServer 
      && 
      <CreateServer />}

      {servers.map((server) => (
        <Link
          key={server._id}
          to={`/chat/${server._id}`}
        >
          <ServerIcon name={server.name} />
        </Link>
      ))}

    </div>
  );
}


export default ServerList;
