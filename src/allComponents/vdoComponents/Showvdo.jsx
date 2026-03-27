import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import Sidevdoinvdo from "./Sidevdoinvdo";
import VdoComments from "./Vdocomments";
import { CiHeart } from "react-icons/ci";
import { FaShareSquare } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { DataContext } from "@/Context/UserContext";
import VdoFunc from "./VdoFunc.jsx"
import api, { getAuthHeaders, getStoredUser } from "@/lib/api";
import AppShell from "../layout/AppShell";

const storedUser = getStoredUser();





function Showvdo() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vdoowner, setVdoOwner] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  // Pull vdofunc state from global context (note lowercase spelling matches UserContext)
  const { vdofunc, setVdofunc, setVdoTobeAdded } = useContext(DataContext);

  const storedUser = getStoredUser();

  const checkSubscriptionStatus = async () => {
    try {
      const response = await api.get(
        // ✅ BUG FIX: storedUser?.id → storedUser?.user?._id
        // localStorage shape: { user: { _id, ... }, accessToken }
        `/subscriptions/u/${storedUser?.user?._id}`,
        { headers: getAuthHeaders() }
      );
      console.log("Subscription status response:", response.data.data);
      const subscribedChannels = response.data.data ?? [];
      const isSubscribedToOwner = subscribedChannels.some(
        (channel) => channel.channelInfo?._id === vdoowner?._id
      );
      setIsSubscribed(isSubscribedToOwner);
      console.log("Is subscribed to owner:", isSubscribedToOwner);

    }
    catch (err) {
      console.error(err);
      toast.error("Failed to check subscription status");
    }
  };
  // ✅ BUG FIX: Direct call hata diya — har render pe fire hota tha (infinite loop)
  // Ab useEffect ke andar call hoga, vdoowner milne ke baad

  const toggleSubscribe = async () => {
    try {
      const response = await api.post(
        `/subscriptions/c/${vdoowner._id}`,
        {},
        { headers: getAuthHeaders() }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setIsSubscribed((prev) => !prev);

    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle subscription");
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setVideo(null);

    const fetchVideo = async () => {
      try {
        const response = await api.get(`/videos/${id}`, {
          headers: getAuthHeaders(),
        });

        const data = response.data.data;
        if (data?.video) {
          setVideo(data.video);
          setVdoOwner(data.owner);
          setVdoTobeAdded(data.video._id); // Store ID for adding to playlist
        } else if (Array.isArray(data)) {
          setVideo(data[0]);
          setVdoOwner(data[1]);
          setVdoTobeAdded(data[0]._id);
        } else {
          setVideo(data);
          setVdoTobeAdded(data._id);
        }
      } catch (err) {
        const message = err?.response?.data?.message || "Failed to load video";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchVideo();
  }, [id]);

  // ✅ BUG FIX: checkSubscriptionStatus ko useEffect me move kiya
  // vdoowner milne ke baad hi call ho
  useEffect(() => {
    if (!storedUser?.user?._id || !vdoowner?._id) return;
    checkSubscriptionStatus();
  }, [vdoowner?._id]);

  const handleLike = async () => {
    try {
      const response = await api.post(
        `/likes/toggle/v/${video._id}`,
        {},
        { headers: getAuthHeaders() }
      );
      console.log(response.data);

      setLiked((prev) => !prev);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to toggle like");
    }

  }

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

  

  if (loading) {
    return (
      <AppShell>
        <div className="surface-card p-8 text-sm text-[#d8d8d8]">Loading video...</div>
      </AppShell>
    );
  }

  // ✅ BUG FIX: null guard restore kiya — warna video=null hone par crash
  if (!video) {
    return (
      <AppShell>
        <div className="surface-card p-8 text-sm text-[#d8d8d8]">Video not found.</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {vdofunc && <VdoFunc />}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-black p-2 shadow-surface">
            <video controls className="h-[260px] w-full rounded-2xl bg-black object-cover sm:h-[420px] lg:h-[560px]">
              <source src={video.videoFile} type="video/mp4" />
            </video>
          </section>

          <section className="surface-card p-5 md:p-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{video.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#b3b3b3]">
              <button className="rounded-full bg-white/10 px-3 py-1.5 text-sm transition hover:bg-white/20" onClick={() => handleLike()}>
                <span className="flex items-center gap-2">{video.likes || 0} <CiHeart className={`text-2xl ${liked ? "text-[#E50914]" : "text-[#d8d8d8]"}`} /></span>
              </button>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm">{video.views || 0} views</span>
              <button className="rounded-full bg-white/10 px-3 py-1.5 text-sm transition hover:bg-white/20" onClick={shareVideo}>
                <span className="flex items-center gap-2"><FaShareSquare /> Share</span>
              </button>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm">{video.createdAt ? new Date(video.createdAt).toDateString() : ""}</span>
              <button className="ml-auto rounded-full bg-white/10 px-3 py-1.5 text-xl transition hover:bg-white/20" onClick={() => setVdofunc(true)}>
                <CgDetailsMore />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <img
                  className="h-12 w-12 rounded-full border border-white/10 object-cover"
                  src={vdoowner?.avatar || "/default-avatar.png"}
                  alt="Author Avatar"
                />
                <p className="text-base font-bold text-white">{vdoowner?.username || "Unknown Author"}</p>
              </div>
              <button
                onClick={() => toggleSubscribe(video.owner._id)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isSubscribed ? "bg-white/20 text-white hover:bg-white/30" : "bg-[#E50914] text-white hover:bg-[#ff1f2d]"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-[#d8d8d8]">{video.description}</p>
          </section>

          <VdoComments videoId={id} />
        </main>

        <aside className="space-y-4">
          <div className="surface-card sticky top-[96px] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Suggested Videos</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-[#777]">Next</span>
            </div>
            <Sidevdoinvdo />
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

export default Showvdo;
