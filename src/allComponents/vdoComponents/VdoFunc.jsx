import { useContext, useState, useEffect } from "react";
import { DataContext } from "@/Context/UserContext";
import { IoCloseSharp, IoChevronBack } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-hot-toast";

function Vdofunc() {
  const { setVdofunc, vdoTobeAdded } = useContext(DataContext);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPlaylists = async () => {
    if (!user?.user?._id) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/playlist/user/${user.user._id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
      });
      setPlaylists(res.data.data || []);
      setShowPlaylists(true);
    } catch (err) {
      toast.error("Failed to load your playlists");
    } finally {
      setLoading(false);
    }
  };

  const addVideo = async (playlistId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/playlist/add/${vdoTobeAdded}/${playlistId}`,
        {},
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      toast.success("Added to playlist!");
      setVdofunc(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add video");
    }
  };
  
  const shareVideo = () => {
    const videoUrl = window.location.href;
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        toast.success("Video URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        toast.error("Failed to copy URL");
      });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setVdofunc(false)}
      />

      <div className="fixed top-24 left-[50%] -translate-x-1/2 z-[70] w-full max-w-sm rounded-2xl overflow-hidden bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <h3 className="text-lg font-bold text-slate-800">
            {showPlaylists ? "Save to..." : "More Actions"}
          </h3>
          <button
            onClick={() => setVdofunc(false)}
            className="rounded-full p-1.5 transition hover:bg-slate-100"
          >
            <IoCloseSharp className="text-xl text-slate-500" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-2">
          {!showPlaylists ? (
            <>
              <button 
                onClick={fetchPlaylists}
                className="w-full group flex items-center gap-3 rounded-xl border border-transparent bg-slate-50 px-4 py-3.5 text-left font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">📋</span>
                Add to Playlist
              </button>
              <button className="w-full group flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3.5 text-left font-semibold text-slate-700 transition hover:bg-slate-100" onClick={()=>{
                shareVideo()
              }}>
                <span className="text-xl">🔗</span>
                Share Video
              </button>
              <button className="w-full group flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3.5 text-left font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-500">
                <span className="text-xl">📝</span>
                Report Video
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <button 
                onClick={() => setShowPlaylists(false)}
                className="flex items-center gap-1 text-sm font-bold text-blue-600 mb-2 hover:underline"
              >
                <IoChevronBack /> Back to menu
              </button>
              
              {loading ? (
                <div className="py-8 text-center text-slate-400 text-sm">Loading playlists...</div>
              ) : playlists.length > 0 ? (
                playlists.map((pl) => (
                  <button
                    key={pl._id}
                    onClick={() => addVideo(pl._id)}
                    className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-left font-medium text-slate-800 transition hover:bg-blue-50 hover:border-blue-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-blue-500">📁</span>
                      <span>{pl.name}</span>
                    </div>
                    <span className="text-xs text-slate-400">{pl.videos?.length || 0} videos</span>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-slate-500 bg-slate-50 rounded-xl">
                   No playlists found. Create one first!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Vdofunc;
