import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidevdoinvdo from "./Sidevdoinvdo";
import VdoComments from "./Vdocomments";
import { CiHeart } from "react-icons/ci";
import { FaShareSquare } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { DataContext } from "@/Context/UserContext";
import VdoFunc from "./VdoFunc.jsx"

const storedUser = JSON.parse(localStorage.getItem("user"));





function Showvdo() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vdoowner, setVdoOwner] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  // Pull vdofunc state from global context (note lowercase spelling matches UserContext)
  const { vdofunc, setVdofunc, setVdoTobeAdded } = useContext(DataContext);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const checkSubscriptionStatus = async () => {
    try {
      const response = await axios.get(
        // ✅ BUG FIX: storedUser?.id → storedUser?.user?._id
        // localStorage shape: { user: { _id, ... }, accessToken }
        `http://localhost:8000/api/v1/subscriptions/u/${storedUser?.user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${storedUser?.accessToken}`,
          },
        }
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
      const response = await axios.post(
        `http://localhost:8000/api/v1/subscriptions/c/${vdoowner._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storedUser?.accessToken}`,
          },
        }
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
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `http://localhost:8000/api/v1/videos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${storedUser?.accessToken}`,
            },
          }
        );

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
        toast.error("Failed to load video");
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

    const response = await axios.post(
      `http://localhost:8000/api/v1/likes/toggle/v/${video._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedUser?.accessToken}`,
        },
      }
    );
    console.log(response.data);

    setLiked(true);
    toast.success(response.data.message);

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
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
        Loading video...
      </div>
    );
  }

  // ✅ BUG FIX: null guard restore kiya — warna video=null hone par crash
  if (!video) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
        Video not found.
      </div>
    );
  }

  return (
    <>
      {/* Show VdoFunc modal when vdofunc is true */}

      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#eef2ff_35%,_#ffffff_100%)] px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 rounded-2xl border border-slate-200/70 bg-white/70 p-4 backdrop-blur md:p-5">
            {/* <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Now playing</p> */}
            {/* <h1 className="mt-2 text-2xl font-black leading-tight text-slate-900 md:text-4xl">{video.title}</h1> */}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <main className="space-y-6">
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-2 shadow-[0_20px_60px_-25px_rgba(2,6,23,0.45)]">
                <video controls className="h-[240px] w-full rounded-2xl object-cover sm:h-[360px] lg:h-[500px]">
                  <source src={video.videoFile} type="video/mp4" />
                </video>
              </section>

              <section className="rounded-3xl border border-slate-900 bg-white p-5 shadow-sm md:p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-600 ">
                  <p className="rounded-full flex gap-2 bg-slate-100 px-3 text-2xl py-1.5 cursor-pointer transition hover:bg-slate-200" onClick={() => handleLike()}> {video.likes || 0} <CiHeart className="text-4xl" /></p>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xl">{video.views || 0} views</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 p-3 text-3xl cursor-pointer transition hover:bg-slate-200"><FaShareSquare /> </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xl">
                    {video.createdAt ? new Date(video.createdAt).toDateString() : ""}
                  </span>
                  {vdofunc && <VdoFunc />}

                  <span className="ml-auto rounded-full bg-slate-100 px-3 py-1.5 p-3 text-3xl cursor-pointer transition hover:bg-slate-200" onClick={() => setVdofunc(true)}><CgDetailsMore /> </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-12 w-12 rounded-full border border-slate-300 object-cover"
                      src={vdoowner?.avatar || "/default-avatar.png"}
                      alt="Author Avatar"
                    />

                    <div>

                      <p className="text-base font-bold text-slate-900">{vdoowner?.username || "Unknown Author"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSubscribe(video.owner._id)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition
  ${isSubscribed
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                  >
                    {isSubscribed ? "Unsubscribe" : "Subscribe"}
                  </button>
                </div>

                <p className="mt-5 whitespace-pre-wrap text-[15px] leading-7 text-slate-700">{video.description}</p>
              </section>

              <VdoComments videoId={id} />
            </main>

            <aside className="space-y-4">
              <div className="sticky top-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex flex-wrap gap-2">
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700">
                    All Videos
                  </button>
                  <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-100">
                    Recommended
                  </button>
                  <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-100">
                    This Channel
                  </button>
                </div>

                <Sidevdoinvdo />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default Showvdo;
