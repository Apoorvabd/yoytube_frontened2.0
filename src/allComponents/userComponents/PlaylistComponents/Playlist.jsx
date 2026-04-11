import Card from "./Playlist_card";
import { DataContext } from "@/Context/UserContext";
import { useContext } from "react";
import Create_playlist from "./Create_playlist";



export  function Playlist() {
    const {setNewPlalistS,newPlaylistS}=useContext(DataContext);
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <h1 className="text-3xl font-bold tracking-tight ">Your Playlists</h1>
                <button 
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900" 
                    onClick={() => setNewPlalistS(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Playlist
                </button>
            </div>
            
            {newPlaylistS && <Create_playlist/>}
            
            <Card/>
            
        </div>
    )
}
export default Playlist 