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
          setError("Please log in to view premium content");
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
          api.get("/videos?sortBy=duration&sortType=desc&limit=8", authHeaders),
        ]);

        setVideos(allRes.data?.data?.videos || []);
        setTrendingVideos(trendingRes.data?.data?.videos || []);
        setRecentVideos(recentRes.data?.data?.videos || []);
        setRecommendedVideos(recommendedRes.data?.data?.videos || []);
        
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Network error: Try refreshing the page");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [setVideos]);

  return (
    <section className="space-y-12 pb-20 bg-background text-foreground transition-colors duration-300">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm transition-all hover:shadow-md">
          <p className="text-sm font-bold text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 text-xs font-black uppercase tracking-widest text-red-700 hover:text-red-900 underline underline-offset-4"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Dynamic Sections */}
      {trendingVideos.length > 0 && (
        <div className="transition-all duration-500 ease-out opacity-100 translate-y-0">
          <SectionRow title="Trending Now" videos={trendingVideos} loading={loading} />
        </div>
      )}

      {recommendedVideos.length > 0 && (
        <div className="transition-all duration-500 ease-out delay-75 opacity-100 translate-y-0">
          <SectionRow title="Recommended for You" videos={recommendedVideos} loading={loading} />
        </div>
      )}

      {recentVideos.length > 0 && (
        <div className="transition-all duration-500 ease-out delay-150 opacity-100 translate-y-0">
          <SectionRow title="Fresh Content" videos={recentVideos} loading={loading} />
        </div>
      )}

      {/* Main Grid */}
      {!loading && videos && videos.length > 0 && (
        <div className="space-y-8 px-4">
          <div className="flex items-center gap-4">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground italic border-b-4 border-primary pb-2">
              Explore Library
            </h3>
            <div className="h-[1px] flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {videos.map((video) => (
              <Card_for_vd0 key={video._id} video={video} />
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="space-y-4">
              <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded-lg bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded-lg bg-muted/60" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AllVdo;

