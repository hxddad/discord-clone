import { useNavigate } from "react-router-dom";

function ServerIcon({ _id, name }: { _id: string; name: string }) {
  const navigate = useNavigate();

  return (
    <button 
      className="rounded-xl bg-gray-800 w-12 h-12 flex items-center justify-center text-white text-lg font-bold cursor-pointer hover:bg-gray-700"
      onClick={() => navigate(`/servers/${_id}`)}
    >
        {name.charAt(0).toUpperCase()}
    </button>
  );
}

export default ServerIcon;