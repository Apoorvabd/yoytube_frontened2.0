import Card_for_vd0 from "./Card_for_vd0";
import SectionRow from "./SectionRow";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../Context/UserContext";

function AllVdo() {
  const ctx = useContext(DataContext);
  if (!ctx) return null;

  const { videos, setVideos } = ctx;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const sortedVideos = [...(videos || [])].sort(
    (first, second) => new Date(second.createdAt || 0) - new Date(first.createdAt || 0)
  );
  const trendingVideos = sortedVideos.slice(0, 8);
  const recommendedVideos = sortedVideos.slice(4, 12);
  const recentVideos = sortedVideos.slice(0, 10);

  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#777]">Browse</p>
        <h2 className="section-title mt-2">Discover</h2>
      </div>

      {error && <p className="rounded-xl border border-white/10 bg-[#181818] p-4 text-sm text-[#d8d8d8]">{error}</p>}

      <SectionRow title="Trending" videos={trendingVideos} loading={loading} />
      <SectionRow title="Recommended" videos={recommendedVideos} loading={loading} />
      <SectionRow title="Recently Uploaded" videos={recentVideos} loading={loading} />

      {!loading && videos && videos.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight text-white">All Videos</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <Card_for_vd0 key={video._id} video={video} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default AllVdo;
