import { GiCrossedBones } from "react-icons/gi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/UserContext";


function UserMore(){
    const {more,setMore}= useContext(DataContext);
    const navigate = useNavigate();

    // handler that will close the panel then navigate
    const go = (path) => {
        setMore(false);
        navigate(path);
    };

    return (
        // semi-transparent backdrop in case we want to click outside to close later
        <div className="fixed inset-0 z-40 flex">
            <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setMore(false)}
            />
            <div className="relative ml-auto w-64  h-full shadow-xl flex flex-col bg-black text-red-950">
                <button
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 "
                    onClick={() => setMore(false)}
                    aria-label="Close panel"
                >
                    <GiCrossedBones className="text-3xl" />
                </button>

                <nav className="mt-16 flex-1 flex flex-col space-y-4 px-6">
                     <button
                        className="text-left text-lg font-medium hover:text-red-600 transition-colors shadow-xl
                        rounded-lg px-4 py-2 bg-white"
                        onClick={() => go("/history")}
                    >
                       history
                    </button>
                    <button
                        className="text-left text-lg font-medium hover:text-red-600 transition-colors shadow-xl
                        rounded-lg px-4 py-2 bg-white"
                        onClick={() => go("/Playlist")}
                    >
                        🎶 Playlists
                    </button>
                    <button
                        className="text-left text-lg font-medium hover:text-red-600 transition-colors shadow-xl
                        rounded-lg px-4 py-2 bg-white"
                        onClick={() => go("/subscribers")}
                    >
                         Subscribers
                    </button>
                    
                   
                    <button
                        className="text-left text-lg font-medium hover:text-red-600 transition-colors  shadow-xl
                        rounded-lg px-4 py-2 bg-white"
                        onClick={() => go("/likedvideos")}
                    >
                        💬 Liked Videos
                    </button>
                    <button
                        className="text-left text-lg font-medium hover:text-red-600 transition-colors  shadow-xl
                        rounded-lg px-4 py-2 bg-white"
                        onClick={() => go("/watchlater")}
                    >
                        watch later 
                    </button>
                    <button
                        className="text-left text-lg font-medium hover:text-red-600 transition-colors  shadow-xl
                        rounded-lg px-4 py-2 bg-white"
                        onClick={() => go("/downloads")}
                    >
                      Downloads
                    </button>
                      <button
                        className="text-left text-lg font-medium hover:text-red-600 transition-colors  shadow-xl
                        rounded-lg px-4 py-2 bg-white"
                        onClick={() => navigate("/subscribedchannels")}
                    >
                      subscribed channels
                    </button>
                    
                    <button
                        className="text-left text-lg font-medium hover:text-red-600 transition-colors  shadow-xl
                        rounded-lg px-4 py-2 bg-white"
                        onClick={() => go("/settings")}
                    >
                       Settings
                    </button>   
                </nav>
            </div>
        </div>
    )
}
export default UserMore;