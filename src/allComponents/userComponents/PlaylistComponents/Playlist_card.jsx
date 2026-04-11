import api from "../../../lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Card() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!user?.user?._id) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/playlist/user/${user.user._id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        });
        setPlaylists(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch playlists");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, [user?.user?._id, user?.accessToken]);

  const goToPlaylist = (id) => {
    navigate(`/playlist/${id}`);
  };

  if (loading) {
    return <div className="p-6 text-center text-slate-400">Loading playlists...</div>;
  }

  return (
    <>
      {playlists && playlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map((playlist) => {
            const firstVideoThumbnail =
              playlist.videos && playlist.videos.length > 0 && playlist.videos[0].thumbnail
                ? playlist.videos[0].thumbnail
                : "https://via.placeholder.com/640x360?text=Empty+Playlist";

            return (
              <div
                key={playlist._id}
                className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-slate-800 cursor-pointer"
                onClick={() => goToPlaylist(playlist._id)}
              >
                {/* Playlist Thumbnail / Theme */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={firstVideoThumbnail}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Playlist Overlay - Stacking effect */}
                  <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center border-l border-white/10 transition-colors group-hover:bg-blue-600/80">
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
                    <span className="text-white/80 text-[10px] uppercase font-semibold tracking-wider">
                      Videos
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow bg-slate-900 border-t border-slate-800">
                  <h2 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {playlist.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-400 line-clamp-2">
                    {playlist.description || "No description provided."}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>View full playlist</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-slate-400 mt-10">No playlists found.</p>
      )}
    </>
  );
}

export default Card;
