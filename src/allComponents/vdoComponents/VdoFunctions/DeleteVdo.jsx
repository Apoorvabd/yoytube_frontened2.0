import React, { useContext, useState } from "react";
import { DataContext } from "../../../Context/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DeleteVdo({ videoId }) {
  const { setVideos } = useContext(DataContext);
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

      await axios.delete(`http://localhost:8000/api/v1/videos/${resolvedVideoId}`, {
        headers: {
          Authorization: `Bearer ${storedUser.accessToken}`,
        },
      });

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
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Danger Zone</p>
        <span className="h-2 w-2 rounded-full bg-red-500" />
      </div>

      {confirmStep === 0 && (
        <button
          type="button"
          onClick={() => {
            setConfirmStep(1);
            setStatus({ type: "", text: "" });
          }}
          className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-black"
        >
          Delete Video
        </button>
      )}

      {confirmStep === 1 && (
        <div className="space-y-2">
          <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Checkpoint 1: This action is permanent.
          </p>
          <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
            Checkpoint 2: Confirm delete to remove video from platform.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmStep(0)}
              disabled={isDeleting}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {status.text && (
        <p
          className={`mt-2 rounded-md px-3 py-2 text-xs ${
            status.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {status.text}
        </p>
      )}
    </div>
  );
}

export default DeleteVdo;
