import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

  if (loading) return <div>Loading...</div>;
  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{playlist.name}</h1>
        <p className="text-gray-600 mt-2">{playlist.description}</p>
        <p className="text-sm mt-1">{playlist.videos?.length || 0} videos</p>
        <button className="mt-10 border-2 w-40 border-slate-600 rounded-sm mr-12 p-2 font-extrabold bg-red-700" onClick={()=>handleAdd()}>Add Videos</button>
         <button className="mt-10 border-2 w-40 border-slate-600 rounded-sm p-2 font-extrabold bg-red-700" onClick={()=>handleDelete()}>Delete playlist</button>
      </div>

      <div className="grid gap-4 shadow-xl bg-slate-100">
        
        {playlist.videos?.map((video) => (
          <div key={video._id} className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm items-center">
            <Link to={`/video/${video._id}`} className="shrink-0">
              <img src={video.thumbnail} alt={video.title} className="w-48 h-28 object-cover rounded" />
            </Link>
            <div className="flex-grow">
              <Link to={`/video/${video._id}`}>
                <h3 className="font-semibold text-lg hover:text-blue-600">{video.title}</h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.description}</p>
            </div>
            <button
              onClick={() => handleRemove(video._id)}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg shrink-0"
            >
              Remove
            </button>
          </div>
        ))}
        {(!playlist.videos || playlist.videos.length === 0) && (
          <p className="text-gray-500 text-center py-8">No videos in this playlist yet.</p>
        )}
      </div>
     
    </div>
  );
}