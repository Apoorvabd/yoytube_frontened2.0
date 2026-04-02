import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import Sidevdoinvdo from "./Sidevdoinvdo";
import VdoComments from "./Vdocomments";
import { Heart, Share2, MoreHorizontal, CheckCircle2, Play, Users, Eye, Calendar } from "lucide-react";
import { DataContext } from "@/Context/UserContext";
import VdoFunc from "./VdoFunc.jsx";
import api, { getAuthHeaders, getStoredUser } from "@/lib/api";
import AppShell from "../layout/AppShell";

/**
 * Showvdo component redesigned as a clean, premium video player page.
 * Uses native Tailwind transitions and Lucide icons.
 */
function Showvdo() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vdoowner, setVdoOwner] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { vdofunc, setVdofunc, setVdoTobeAdded } = useContext(DataContext);

  const checkSubscriptionStatus = async (ownerId) => {
    try {
      const storedUser = getStoredUser();
      if (!storedUser?.user?._id) return;
      const response = await api.get(`/subscriptions/u/${storedUser.user._id}`, { headers: getAuthHeaders() });
      const subscribedChannels = response.data.data ?? [];
      setIsSubscribed(subscribedChannels.some(c => c.channelInfo?._id === ownerId));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSubscribe = async () => {
    try {
      const response = await api.post(`/subscriptions/c/${vdoowner?._id}`, {}, { headers: getAuthHeaders() });
      toast.success(response.data?.message || "Success");
      setIsSubscribed(!isSubscribed);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/videos/${id}`, { headers: getAuthHeaders() });
        const data = response.data.data;
        const v = data.video || (Array.isArray(data) ? data[0] : data);
        const o = data.owner || (Array.isArray(data) ? data[1] : null);
        setVideo(v);
        setVdoOwner(o);
        setVdoTobeAdded(v._id);
        if (o?._id) checkSubscriptionStatus(o._id);
      } catch (err) {
        toast.error("Failed to load video");
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await api.post(`/likes/toggle/v/${video._id}`, {}, { headers: getAuthHeaders() });
      setLiked(!liked);
      // Backend returns message in response.data.message
      toast.success(response.data?.message || "Success");
      
      // Update local like count visually if needed or re-fetch video
    } catch (err) {
      toast.error("Failed to toggle like");
    }
  };

  const shareVideo = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  if (loading) return (
    <AppShell>
      <div className="flex h-[70vh] flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Play className="w-5 h-5 text-indigo-600 fill-indigo-600" />
          </div>
        </div>
        <p className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase animate-pulse">Initializing Theatre</p>
      </div>
    </AppShell>
  );

  if (!video) return (
    <AppShell>
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <p className="text-lg font-bold text-slate-900 uppercase">Stream Not Found</p>
        <button onClick={() => window.history.back()} className="mt-4 text-sm text-indigo-600 font-bold hover:underline">Go Back</button>
      </div>
    </AppShell>
  );

  return (
    <AppShell>
      {/* Function Modal Overlay */}
      {vdofunc && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-opacity duration-300">
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <VdoFunc />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_400px]">
        <main className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          {/* Video Player Container */}
          <div className="group relative aspect-video w-full overflow-hidden rounded-[2.5rem] bg-black shadow-2xl ring-1 ring-slate-200">
            <video 
              controls 
              autoPlay 
              className="h-full w-full object-contain"
              poster={video.thumbnail}
            >
              <source src={video.videoFile} type="video/mp4" />
            </video>
          </div>

          {/* Video Info Section */}
          <section className="surface-card rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm bg-white">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl leading-[1.1]">
              {video.title}
            </h1>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-8 border-b border-slate-50 pb-8">
              <div className="flex items-center gap-5">
                <img 
                  className="h-14 w-14 rounded-2xl object-cover ring-4 ring-slate-50 transition-transform hover:scale-105" 
                  src={vdoowner?.avatar || "/hero.jfif"} 
                  alt={vdoowner?.username} 
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-slate-900">
                      {vdoowner?.username || "Creator"}
                    </p>
                    <CheckCircle2 className="text-indigo-500 w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {vdoowner?.subscribersCount || "0"}</span>
                  </div>
                </div>
                <button 
                  onClick={toggleSubscribe}
                  className={`ml-4 rounded-full px-8 py-3.5 text-xs font-black uppercase tracking-[0.1em] transition-all active:scale-95 ${
                    isSubscribed 
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                      : "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
                  }`}
                >
                  {isSubscribed ? "Following" : "Subscribe"}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <ActionBtn 
                  icon={<Heart size={20} className={liked ? "fill-red-500 text-red-500" : "text-slate-600"} />} 
                  count={video.likes} 
                  onClick={handleLike} 
                  active={liked} 
                />
                <ActionBtn 
                  icon={<Share2 size={18} className="text-slate-600" />} 
                  label="Share" 
                  onClick={shareVideo} 
                />
                <ActionBtn 
                  icon={<MoreHorizontal size={20} className="text-slate-600" />} 
                  onClick={() => setVdofunc(true)} 
                />
              </div>
            </div>

            {/* Description Card */}
            <div className="mt-8">
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                <Eye className="w-3.5 h-3.5" />
                <span>{video.views || 0} Professional Views</span>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <Calendar className="w-3.5 h-3.5" />
                <span>{video.createdAt ? new Date(video.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : ""}</span>
              </div>
              <div className="rounded-3xl bg-slate-50/50 p-6 border border-slate-100/50">
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed font-medium text-slate-600 italic">
                  {video.description || "No description provided."}
                </p>
              </div>
            </div>
          </section>

          <VdoComments videoId={id} />
        </main>

        <aside className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
          <div className="surface-card rounded-[2.5rem] p-6 border border-slate-100 bg-white sticky top-24">
            <h2 className="mb-6 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3 px-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" /> 
              Next for you
            </h2>
            <Sidevdoinvdo />
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function ActionBtn({ icon, label, count, onClick, active }) {
  return (
    <button 
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 transition-all border border-slate-100 shadow-sm hover:border-slate-200 hover:bg-slate-50 active:scale-95 ${
        active ? "bg-indigo-50/30 border-indigo-100" : ""
      }`}
    >
      <span className="transition-transform group-hover:scale-110">{icon}</span>
      {(count !== undefined || label) && (
        <span className="text-xs font-bold tracking-tight text-slate-700">
          {count ?? label}
        </span>
      )}
    </button>
  );
}

export default Showvdo;
