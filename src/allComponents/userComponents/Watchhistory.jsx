import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WatchHistory() {

  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    const storedUser=JSON.parse(localStorage.getItem("user"))
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/watchHistory",{
        headers:{
            Authorization: `Bearer ${storedUser.accessToken}`
        }
      });
      setVideos(res.data.data);
      console.log(res)
    } catch (err) {
      console.log(err);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {videos.map((video) => (

          <div
            key={video._id}
            onClick={() => navigate(`/video/${video._id}`)}
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
                  src={video.owner.avatar}
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />

                <span className="text-sm text-gray-600">
                  {video.owner.fullName}
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