import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  
  function CreateServer(){
    const navigate = useNavigate();
    const [serverName, setServerName] = useState('');
    const [isOpenInterface, setOpenInterface] = useState(true);

    if (!isOpenInterface) return null;

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {

    if (!serverName.trim()) return;

    e.preventDefault();
    
    const token = localStorage.getItem('token');

    try {
      // 2. Send the data to your API in the background
      const response = await fetch('http://localhost:5000/api/servers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: serverName }),
      });

      if (response.ok) {
        console.log('Server created successfully!');
        setServerName(''); // clear the input field after success
        setOpenInterface(false); // close server creation ui after creation
        const data = await response.json(); // fetch data
        // Route to the newly created server's page 
        navigate(`./${data._id}`); 
      } else {
        console.error('Failed to create server');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-800 w-80 h-40 flex items-center justify-center text-white text-lg font-bold cursor-pointer hover:bg-gray-700">
        <form onSubmit={handleSubmit}>
          <input type="text" 
            name="name" 
            placeholder="Server Name"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)} 
            className="rounded-lg bg-gray-700 w-full h-8 px-2 py-1 text-white text-sm font-bold cursor-pointer hover:bg-gray-600" />
              <button 
              type="submit" 
              className="rounded-lg bg-gray-700 w-full h-8 px-2 text-white text-sm font-bold cursor-pointer hover:bg-gray-600"
            >
                Create
            </button>
          </form>
        </div>
    </div>
);
}

export default CreateServer;