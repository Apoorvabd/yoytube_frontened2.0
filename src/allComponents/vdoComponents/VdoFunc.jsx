import { useContext, useState, useEffect } from "react";
import { DataContext } from "@/Context/UserContext";
import { IoCloseSharp, IoChevronBack } from "react-icons/io5";
import api from "../../lib/api";
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
      const res = await api.get(`/playlist/user/${user.user._id}`, {
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
      const res = await api.patch(
        `/playlist/add/${vdoTobeAdded}/${playlistId}`,
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

      <div className="fixed top-24 left-[50%] -translate-x-1/2 z-[70] w-full max-w-sm rounded-[2rem] overflow-hidden bg-card border border-border shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-5">
          <h3 className="text-xl font-black text-foreground">
            {showPlaylists ? "Save to..." : "More Actions"}
          </h3>
          <button
            onClick={() => setVdofunc(false)}
            className="rounded-full p-2 transition hover:bg-muted"
          >
            <IoCloseSharp className="text-2xl text-muted-foreground" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 space-y-3">
          {!showPlaylists ? (
            <>
              <button 
                onClick={fetchPlaylists}
                className="w-full group flex items-center gap-4 rounded-2xl border border-transparent bg-muted/30 px-5 py-4 text-left font-bold text-foreground transition hover:bg-primary/10 hover:text-primary hover:border-primary/20"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="text-xl">📋</span>
                </div>
                <span>Add to Playlist</span>
              </button>
              <button 
                onClick={shareVideo}
                className="w-full group flex items-center gap-4 rounded-2xl bg-muted/30 px-5 py-4 text-left font-bold text-foreground transition hover:bg-muted/50"
              >
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  <span className="text-xl">🔗</span>
                </div>
                <span>Share Video</span>
              </button>
              <button className="w-full group flex items-center gap-4 rounded-2xl bg-muted/30 px-5 py-4 text-left font-bold text-foreground transition hover:bg-destructive/10 hover:text-destructive">
                <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                  <span className="text-xl">📝</span>
                </div>
                <span>Report Video</span>
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
                <div className="py-8 text-center text-muted-foreground text-xs font-bold animate-pulse">Loading playlists...</div>
              ) : playlists.length > 0 ? (
                playlists.map((pl) => (
                  <button
                    key={pl._id}
                    onClick={() => addVideo(pl._id)}
                    className="w-full flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/20 px-5 py-4 text-left font-bold text-foreground transition hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📁</span>
                      <span>{pl.name}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{pl.videos?.length || 0} videos</span>
                  </button>
                ))
              ) : (
                <div className="py-12 text-center text-muted-foreground bg-muted/20 rounded-3xl border border-dashed border-border px-6">
                   <p className="text-sm font-bold">No playlists found</p>
                   <p className="text-[10px] mt-1 opacity-60">Create a playlist to save videos</p>
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
