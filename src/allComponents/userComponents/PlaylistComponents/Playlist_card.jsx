import api from "../../../lib/api";
import { useEffect ,useState,useContext} from "react";
import { toast } from "react-hot-toast";
import { DataContext } from "@/Context/UserContext";

function Card(){
    const [platlists,setPlalists]=useState([]);
const user=JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        const fetchPalylist= async ()=>{
            // ensure we have a logged-in user
           

            try{
                const res=await api.get(`/playlist/user/${user.user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });
                // server responds with { status, data, message }
                setPlalists(res.data.data || []);
                console.log(res.data);
                toast.success("playlists fetched successfully");

            }
            catch(err){
                console.log(err);
                toast.error("failed to fetch playlists");
            }
        }
        fetchPalylist();

    // ✅ FIX: user.user._id — localStorage shape: { user: {_id}, accessToken }
    }, [user?.user?._id]);

  return (
    <>
      {platlists && platlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {platlists.map((playlist) => {
            const firstVideoThumbnail = playlist.videos && playlist.videos.length > 0 
              ? playlist.videos[0].thumbnail 
              : "https://via.placeholder.com/640x360?text=Empty+Playlist";

            return (
              <div
                key={playlist._id}
                className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-[400px] border border-slate-800"
              >
                {/* Playlist Thumbnail / Theme */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={firstVideoThumbnail}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Playlist Overlay - Stacking effect */}
                  <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center border-l border-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                    <span className="text-white font-bold text-lg">
                      {playlist.videos?.length || 0}
                    </span>
                    <span className="text-white/70 text-xs uppercase tracking-wider">
                      Videos
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow bg-gradient-to-t from-slate-900 to-slate-800">
                  <h2 className="text-xl font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {playlist.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-2 italic">
                    {playlist.description || "No description provided."}
                  </p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">
                      Updated recently
                    </span>
                    <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-full transition-colors border border-white/5">
                      View Playlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No playlists found.</p>
      )}
    </>
  );
}
export default Card ;
