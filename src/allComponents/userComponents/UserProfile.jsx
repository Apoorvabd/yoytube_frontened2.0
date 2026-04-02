import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Card_for_vd0 from "../vdoComponents/Card_for_vd0";
import api, { getAuthHeaders, getStoredUser } from "@/lib/api";
import AppShell from "../layout/AppShell";
import { User, Users, Play, Share2, ShieldCheck, Mail } from "lucide-react";

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  const storedUser = getStoredUser();
  const accessToken = storedUser?.accessToken;

  const fetchChannelDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/users/channel/${id}`, accessToken ? { headers: getAuthHeaders() } : {});
      setChannel(res.data.data);
    } catch (err) {
      toast.error("Failed to load channel");
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelVideos = async () => {
    try {
      const res = await api.get(`/videos?userId=${id}`, accessToken ? { headers: getAuthHeaders() } : {});
      const data = res.data?.data;
      const vids = data?.videos ?? data?.docs ?? (Array.isArray(data) ? data : []);
      setVideos(vids);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchChannelDetails();
      fetchChannelVideos();
    }
  }, [id]);

  const handleSubscribe = async () => {
    if (!accessToken) {
      toast.error("Please log in to follow");
      return;
    }
    try {
      setSubscribing(true);
      await api.post(`/subscriptions/c/${id}`, {}, { headers: getAuthHeaders() });
      setChannel((prev) => ({
        ...prev,
        isSubscribed: !prev.isSubscribed,
        subscribersCount: prev.isSubscribed
          ? prev.subscribersCount - 1
          : prev.subscribersCount + 1,
      }));
      toast.success(channel?.isSubscribed ? "Unfollowed" : "Following! 🎉");
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setSubscribing(false);
    }
  };

  const shareProfile = () => {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl)
      .then(() => toast.success("Share link copied!"))
      .catch(() => toast.error("Copy failed"));
  }

  if (loading) return (
    <AppShell>
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Sourcing Profile</p>
      </div>
    </AppShell>
  );

  if (!channel) return (
    <AppShell>
      <div className="flex h-[40vh] items-center justify-center">
        <p className="text-lg font-bold text-destructive uppercase tracking-widest">Creator space not found</p>
      </div>
    </AppShell>
  );

  return (
    <AppShell>
      <div className="space-y-8 pb-12 animate-in fade-in duration-700">
        {/* Cover & Hero Section */}
        <section className="relative h-64 md:h-80 overflow-hidden rounded-[3rem] border border-border shadow-soft group">
          <div className="absolute inset-0 bg-slate-100">
            {channel.coverImage ? (
              <img src={channel.coverImage} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-100" />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img
                  src={channel.avatar || `https://ui-avatars.com/api/?name=${channel.username}&background=6366f1&color=fff&size=128`}
                  className="h-28 w-28 md:h-36 md:w-36 rounded-[2.5rem] border-8 border-background object-cover shadow-2xl transition-transform group-hover:rotate-6"
                  alt={channel.username}
                />
                <div className="absolute -bottom-2 -right-2 bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/30">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <div className="pb-2">
                <h1 className="text-4xl md:text-5xl font-[1000] tracking-tighter text-foreground leading-none">
                  {channel.fullName}<span className="text-primary">.</span>
                </h1>
                <div className="flex items-center gap-4 mt-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-primary" /> {channel.subscribersCount?.toLocaleString() || 0} Followers</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-border" />
                  <span>@{channel.username}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleSubscribe} 
                disabled={subscribing}
                className={`flex h-14 items-center gap-3 rounded-full px-8 text-sm font-black uppercase tracking-widest transition-all active:scale-95 ${
                  channel.isSubscribed 
                  ? "bg-muted text-foreground hover:bg-muted/80" 
                  : "bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary/90"
                }`}
              >
                {channel.isSubscribed ? "Following" : "Follow Creator"}
              </button>
              <button 
                onClick={shareProfile}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-border text-foreground transition-all hover:bg-muted active:scale-95"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Videos" value={videos.length} icon={<Play size={18} />} />
          <StatCard label="Followers" value={channel.subscribersCount} icon={<Users size={18} />} />
          <StatCard label="Member Since" value={new Date(channel.createdAt || Date.now()).getFullYear()} icon={<ShieldCheck size={18} />} />
          <StatCard label="Status" value="Verified" icon={<ShieldCheck size={18} />} color="text-emerald-500" />
        </section>

        {/* Videos Section */}
        <section className="surface-card bg-white p-8 md:p-12 border border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-foreground">Productions<span className="text-primary">.</span></h2>
              <p className="text-sm font-bold text-muted-foreground mt-1 lowercase tracking-wide">Published works from this studio</p>
            </div>
          </div>

          {videos.length === 0 ? (
            <div className="py-24 text-center">
              <div className="h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground mx-auto mb-6">
                <Play size={32} />
              </div>
              <p className="text-lg font-bold text-foreground">Studio is quiet...</p>
              <p className="text-sm text-muted-foreground">No videos have been published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {videos.map((v) => (
                <div key={v._id} className="transition-transform duration-300 hover:scale-[1.03]">
                  <Card_for_vd0 
                    video={{
                      ...v,
                      owner: v.owner ?? { _id: id, username: channel.username, avatar: channel.avatar }
                    }} 
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({ label, value, icon, color = "text-primary" }) {
  return (
    <div className="surface-card p-6 border-slate-100/60 bg-white/50 hover:bg-white transition-colors group">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40 transition-transform group-hover:scale-110 ${color}`}>
        {icon}
      </div>
      <p className="text-3xl font-[1000] text-foreground tracking-tighter">{value?.toLocaleString() || value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
    </div>
  );
}

export default UserProfile;