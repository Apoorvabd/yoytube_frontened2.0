import Card from "./Playlist_card";
import { DataContext } from "@/Context/UserContext";
import { useContext } from "react";
import Create_playlist from "./Create_playlist";



export  function Playlist() {
    const {setNewPlalistS,newPlaylistS}=useContext(DataContext);
    return (
        <div>
            <button className="text-red-900 w-60 m-3 border-red-900 border-2 bg-slate-200 font-bold text-xl  " onClick={()=>setNewPlalistS(true)}>create a new playlist</button>
            {newPlaylistS && <Create_playlist/>}
            
            <Card/>
            

        </div>
    )
}
export default Playlist 