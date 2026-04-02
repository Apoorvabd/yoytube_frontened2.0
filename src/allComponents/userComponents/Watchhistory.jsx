import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { getAuthHeaders } from "@/lib/api";
import AppShell from "../layout/AppShell";
import Card_for_vd0 from "../vdoComponents/Card_for_vd0";

function WatchHistory() {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const res = await api.get("/users/watchHistory",{
        headers: getAuthHeaders(),
      });
      setVideos(res.data?.data || []);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load watch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-foreground">
            Watch History
          </h1>
          <p className="text-sm font-bold text-muted-foreground">{videos.length} videos</p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-2xl shimmer" />
            ))}
          </div>
        )}
        
        {error && <p className="text-sm font-bold text-red-500 bg-red-500/10 p-4 rounded-xl">{error}</p>}

        {!loading && videos.length === 0 && (
          <div className="surface-card flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-bold text-foreground">No watch history yet</p>
            <p className="text-sm text-muted-foreground mt-1">Videos you watch will appear here.</p>
            <button 
              onClick={() => navigate("/")}
              className="mt-6 accent-btn"
            >
              Browse Videos
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card_for_vd0 key={video._id} video={video} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export default WatchHistory;

