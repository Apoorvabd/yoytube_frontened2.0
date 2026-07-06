import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../layout/Loader";

export default function PlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  async function fetchPlaylist() {
    try {
      const { data } = await api.get(`/playlist/${id}`);
      setPlaylist(data.data);
    } catch (error) {
      toast.error("Failed to fetch playlist");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) return;
    try {
      await api.delete(`/playlist/${id}`);
      toast.success("Playlist deleted");
      // Optionally, redirect to another page after deletion
      setTimeout(() => {
        navigate("/Playlist");
      }, 1500);

    } catch (error) {
      toast.error("Failed to delete playlist");
    }
  };
  const handleAdd = () => {
    navigate(`/`);
  };


  const handleRemove = async (videoId) => {
    try {
      await api.patch(`/playlist/remove/${videoId}/${id}`);
      toast.success("Video removed from playlist");
      fetchPlaylist();
    } catch (error) {
      toast.error("Failed to remove video");
    }
    
  };

  if (loading) return <div className="flex justify-center h-screen"><Loader/></div>;
  if (!playlist) return <div>Playlist not found</div>;

 return (
  <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {playlist.name}
            </h1>

            <p className="text-gray-600 mt-3 max-w-3xl">
              {playlist.description}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {playlist.videos?.length || 0} Videos
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Add Videos
            </button>

            <button
              onClick={handleDelete}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Delete Playlist
            </button>
          </div>

        </div>
      </div>

      {/* Videos */}

      {playlist.videos?.length > 0 ? (
        <div className="space-y-5">

          {playlist.videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <div className="flex flex-col md:flex-row gap-5">

                {/* Thumbnail */}

                <Link
                  to={`/video/${video._id}`}
                  className="w-full md:w-80 shrink-0"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                </Link>

                {/* Content */}

                <div className="flex flex-col justify-between flex-1">

                  <div>

                    <Link to={`/video/${video._id}`}>
                      <h2 className="text-xl font-bold hover:text-blue-600 transition">
                        {video.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 mt-3 line-clamp-3">
                      {video.description}
                    </p>

                  </div>

                  <div className="mt-5 flex justify-end">

                    <button
                      onClick={() => handleRemove(video._id)}
                      className="px-5 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-semibold transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-16 flex flex-col items-center justify-center">

          <div className="text-7xl mb-4">🎬</div>

          <h2 className="text-2xl font-bold">
            No Videos Yet
          </h2>

          <p className="text-gray-500 mt-2 text-center">
            This playlist doesn't contain any videos.
          </p>

          <button
            onClick={handleAdd}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold"
          >
            Add Videos
          </button>

        </div>
      )}

    </div>
  </div>
);
}