import React, { useContext, useState } from "react";
import { VideoContext } from "../../../contexts/VideoContext";
import api from "../../../lib/api";
import { useNavigate, useParams } from "react-router-dom";

function DeleteVdo({ videoId }) {
  const { setVideos } = useContext(VideoContext);
  const navigate = useNavigate();
  const { id, videoId: routeVideoId } = useParams();
  const resolvedVideoId = videoId || routeVideoId || id;
  const [confirmStep, setConfirmStep] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const handleDelete = async () => {
    setIsDeleting(true);
    setStatus({ type: "", text: "" });

    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (!storedUser?.accessToken) {
        setStatus({ type: "error", text: "Login required to delete this video." });
        setIsDeleting(false);
        return;
      }

      if (!resolvedVideoId) {
        setStatus({ type: "error", text: "Invalid video id. Please try again." });
        setIsDeleting(false);
        return;
      }

      await api.delete(`/videos/${resolvedVideoId}`);

      setVideos((prev) => prev.filter((video) => video._id !== resolvedVideoId));
      setStatus({ type: "success", text: "Video deleted successfully." });
      setConfirmStep(0);
      setTimeout(() => {
        navigate("/Dashboard");
      }, 900);
    } catch (err) {
      console.error("Delete error:", err);
      setStatus({ type: "error", text: "Failed to delete video. Please try again." });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-20 bg-white shadow-xl rounded-2xl border border-slate-100">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Delete Video</h2>
        <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
      </div>

      <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl">
        <p className="text-sm text-red-700 font-medium">
          Warning: This action is permanent and cannot be undone. All views, likes, and comments associated with this video will be lost.
        </p>
      </div>

      {status.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
          status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          {status.text}
        </div>
      )}

      {confirmStep === 0 && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={() => setConfirmStep(1)}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-black"
          >
            Delete
          </button>
        </div>
      )}

      {confirmStep === 1 && (
        <div className="space-y-4">
          <p className="text-center text-sm font-bold text-slate-600">Are you absolutely sure?</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete It"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmStep(0)}
              disabled={isDeleting}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteVdo;
