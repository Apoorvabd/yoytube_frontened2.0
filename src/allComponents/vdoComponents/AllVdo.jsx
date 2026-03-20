import Card_for_vd0 from "./Card_for_vd0";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../Context/UserContext";

function AllVdo() {
  const ctx = useContext(DataContext);
  if (!ctx) return null;

  const { videos, setVideos } = ctx;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("videos in allvdo component", videos);

  const sampleVideos = [
    {
      _id: "sample1",
      title: "Sample Flower Video",
      description: "A fallback sample video",
      thumbnail: "/hero.jfif",
      owner: { username: "Demo", avatar: "/logo.png" },
      createdAt: new Date().toISOString(),
      views: 123,
    },
  ];

  useEffect(() => {
    const getallvdo = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser?.accessToken) {
          setError("Please log in to view videos");
          setVideos(sampleVideos);
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          "http://localhost:8000/api/v1/videos/",
          {
            headers: {
              Authorization: `Bearer ${storedUser.accessToken}`,
            },
          }
        );

        const videosData = data?.data?.videos || [];

        if (videosData.length > 0) {
          setVideos(videosData);
          setError(null);
        } else {
          setVideos(sampleVideos);
          setError(null);
        }
      } catch (err) {
        setError("Could not fetch videos. Showing sample data.");
        setVideos(sampleVideos);
      } finally {
        setLoading(false);
      }
    };

    getallvdo();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#eef2ff_35%,_#ffffff_100%)] px-4 py-6 md:px-8 md:py-8">
      <section className="mx-auto max-w-[1400px] space-y-5 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur md:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Video Library</p>
          <h1 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">Explore All Videos</h1>
        </div>

        {loading && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-sm text-slate-500">
            Loading videos...
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center text-sm text-amber-700">
            {error}
          </p>
        )}

        {videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <Card_for_vd0 key={video._id} video={video} />
            ))}
          </div>
        ) : (

          !loading && (
            <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-sm text-slate-500">
              No videos available
            </p>
          )
        )}
      </section>
    </div>
  );
}

export default AllVdo;
