import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { getAuthHeaders } from "@/lib/api";

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
      console.log(res)
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
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Watch History
      </h1>

      {loading && <p className="mb-4 text-sm text-gray-600">Loading history...</p>}
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {videos.map((video) => (

          <div
            key={video._id}
            onClick={() => navigate(`/videos/${video._id}`)}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
          >

            {/* Thumbnail */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-3">

              <h2 className="font-semibold line-clamp-2">
                {video.title}
              </h2>

              {/* Owner */}
              <div className="flex items-center gap-2 mt-2">

                <img
                  src={video.owner?.avatar}
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />

                <span className="text-sm text-gray-600">
                  {video.owner?.fullName || "Unknown"}
                </span>

              </div>

              {/* Date */}
              <p className="text-xs text-gray-500 mt-1">
                {new Date(video.createdAt).toLocaleDateString()}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default WatchHistory;