import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Card_for_vd0 from "../vdoComponents/Card_for_vd0";

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  // localStorage shape: { user: { _id, fullName, ... }, accessToken, refreshToken }
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const accessToken = storedUser?.accessToken;

  // ── Fetch channel details ────────────────────────────────────────────────
  const fetchChannelDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/v1/users/channel/${id}`,
        accessToken
          ? { headers: { Authorization: `Bearer ${accessToken}` } }
          : {}
      );
      setChannel(res.data.data);
    } catch (err) {
      console.error("Error fetching channel:", err);
      toast.error("Failed to load channel");
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch channel's videos ───────────────────────────────────────────────
  const fetchChannelVideos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/videos?userId=${id}`,
        accessToken
          ? { headers: { Authorization: `Bearer ${accessToken}` } }
          : {}
      );
      // Backend returns: { data: { videos: [...], page, totalVideos, ... } }
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

  // ── Subscribe / Unsubscribe ──────────────────────────────────────────────
  const handleSubscribe = async () => {
    if (!accessToken) {
      toast.error("Please log in to subscribe");
      return;
    }
    try {
      setSubscribing(true);
      await axios.post(
        `http://localhost:8000/api/v1/subscriptions/c/${id}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setChannel((prev) => ({
        ...prev,
        isSubscribed: !prev.isSubscribed,
        subscribersCount: prev.isSubscribed
          ? prev.subscribersCount - 1
          : prev.subscribersCount + 1,
      }));
      toast.success(channel?.isSubscribed ? "Unsubscribed" : "Subscribed! 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Subscription failed");
    } finally {
      setSubscribing(false);
    }
  };

  // ── Format helpers ───────────────────────────────────────────────────────
  const formatViews = (v) => {
    if (!v) return "0";
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
    if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
    return String(v);
  };

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-zinc-700 border-t-red-500 rounded-full animate-spin" />
        <p className="text-zinc-400 text-sm">Loading channel…</p>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-red-400 text-lg font-semibold">Channel not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans pb-20">

      {/* ── Cover Banner ── */}
      <div className="w-full h-48 md:h-60 overflow-hidden bg-zinc-800">
        {channel.coverImage ? (
          <img
            src={channel.coverImage}
            alt="Channel Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-900 via-zinc-900 to-zinc-800" />
        )}
      </div>

      {/* ── Channel Header ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 sm:-mt-14">

          {/* Avatar */}
          <img
            src={
              channel.avatar ||
              `https://ui-avatars.com/api/?name=${channel.username}&background=e53935&color=fff&size=128`
            }
            alt={channel.username}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#0f0f0f] object-cover shrink-0 shadow-xl"
          />

          {/* Info + Subscribe */}
          <div className="flex flex-1 flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-1 w-full">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {channel.fullName}
              </h1>
              <p className="text-zinc-400 text-sm mt-0.5">@{channel.username}</p>
              <p className="text-zinc-500 text-xs mt-1">
                <span className="text-zinc-300 font-medium">
                  {formatViews(channel.subscribersCount)}
                </span>{" "}
                subscribers ·{" "}
                <span className="text-zinc-300 font-medium">
                  {formatViews(channel.channelsSubscribedToCount)}
                </span>{" "}
                subscribed
              </p>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={subscribing}
              className={`shrink-0 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 
                ${
                  channel.isSubscribed
                    ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                    : "bg-red-600 hover:bg-red-500 text-white"
                } 
                disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {subscribing
                ? "..."
                : channel.isSubscribed
                ? "✓ Subscribed"
                : "Subscribe"}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-b border-zinc-800" />

        {/* ── Videos Section ── */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-5">Videos</h2>

          {videos.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <p className="text-4xl mb-3">🎬</p>
              <p className="text-base font-medium">No videos uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {videos.map((v) => (
                <Card_for_vd0
                  key={v._id}
                  video={{
                    ...v,
                    // agar owner already populated hai (getAllVideos me .populate hai)
                    // toh directly pass karo, warna channel se inject karo
                    owner: v.owner ?? {
                      _id: id,
                      username: channel.username,
                      avatar: channel.avatar,
                    },
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;