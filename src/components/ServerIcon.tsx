function ServerIcon({ name }: { name: string }) {
  return (
    <button 
      className="rounded-xl bg-gray-800 w-12 h-12 flex items-center justify-center text-white text-lg font-bold cursor-pointer hover:bg-gray-700"
    >
        {name.charAt(0).toUpperCase()}
    </button>
  );
}

export default ServerIcon;