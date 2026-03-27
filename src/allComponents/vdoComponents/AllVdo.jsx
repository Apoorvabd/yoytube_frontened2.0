import Card_for_vd0 from "./Card_for_vd0";
import SectionRow from "./SectionRow";
import api from "../../lib/api";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../Context/UserContext";

function AllVdo() {
  const ctx = useContext(DataContext);
  if (!ctx) return null;

  const { videos, setVideos } = ctx;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [trendingVideos, setTrendingVideos] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [recentVideos, setRecentVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.accessToken) {
          setError("Please log in to view videos");
          setLoading(false);
          return;
        }

        const authHeaders = {
          headers: { Authorization: `Bearer ${storedUser.accessToken}` }
        };

        const [allRes, trendingRes, recentRes, recommendedRes] = await Promise.all([
          api.get("/videos", authHeaders),
          api.get("/videos?sortBy=views&sortType=desc&limit=8", authHeaders),
          api.get("/videos?sortBy=createdAt&sortType=desc&limit=10", authHeaders),
          api.get("/videos?sortBy=duration&sortType=desc&limit=8", authHeaders), // using duration or random logic
        ]);

        setVideos(allRes.data?.data?.videos || []);
        setTrendingVideos(trendingRes.data?.data?.videos || []);
        setRecentVideos(recentRes.data?.data?.videos || []);
        setRecommendedVideos(recommendedRes.data?.data?.videos || []);
        
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not fetch videos consistently");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [setVideos]);

  return (
    <section className="space-y-8 animate-fade-in-up">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#777]">Browse</p>
        <h2 className="section-title mt-2">Discover</h2>
      </div>

      {error && <p className="rounded-xl border border-white/10 bg-[#181818] p-4 text-sm text-[#d8d8d8]">{error}</p>}

      {trendingVideos.length > 0 && <SectionRow title="Trending" videos={trendingVideos} loading={loading} />}
      {recommendedVideos.length > 0 && <SectionRow title="Recommended" videos={recommendedVideos} loading={loading} />}
      {recentVideos.length > 0 && <SectionRow title="Recently Uploaded" videos={recentVideos} loading={loading} />}

      {!loading && videos && videos.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight text-white">All Videos</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 hover-cards">
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
