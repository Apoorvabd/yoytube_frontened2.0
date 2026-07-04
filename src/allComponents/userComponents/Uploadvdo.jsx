import React, { useState } from "react";
import { UploadCloud, X, Film, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api, { getAuthHeaders } from "../../lib/api";
import AppShell from "../layout/AppShell";

function Uploadvdo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Please provide a title and description");
      return;
    }

    if (!videoFile) {
      toast.error("A video file is required");
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
    formData.append("title", title);
    formData.append("description", description);

    try {
      await api.post("/videos", formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      toast.success("Video uploaded successfully");
      setTimeout(() => navigate("/Dashboard"), 1200);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Publishing failed");
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
            <UploadCloud size={26} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Upload your video
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Keep it simple. Add a title, a description, and your files, then publish.
          </p>
        </header>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a clean title"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a short description..."
                    className="h-40 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    required
                  />
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-dashed p-6 transition-colors ${
                videoFile ? "border-blue-200 bg-blue-50/40" : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              {!videoFile ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                    <Film size={28} />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-slate-900">Add your video file</h3>
                  <p className="mb-6 max-w-sm text-sm leading-6 text-slate-500">MP4, WebM, or OGG files are supported.</p>
                  <label className="inline-flex cursor-pointer items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files[0])}
                      className="hidden"
                    />
                    Choose video
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Film size={20} />
                    </div>
                    <div>
                      <p className="max-w-[200px] truncate text-sm font-medium text-slate-900 md:max-w-xs">{videoFile.name}</p>
                      <p className="text-xs text-slate-500">Ready to upload</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVideoFile(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className="mb-4 block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Thumbnail
              </label>

              <div
                className={`relative aspect-video overflow-hidden rounded-xl border border-dashed transition-colors ${
                  thumbnailFile ? "border-blue-200 bg-blue-50/40" : "border-slate-200 bg-slate-50"
                }`}
              >
                {thumbnailFile ? (
                  <>
                    <img
                      src={URL.createObjectURL(thumbnailFile)}
                      className="h-full w-full object-cover"
                      alt="Thumbnail Preview"
                    />
                    <button
                      type="button"
                      onClick={() => setThumbnailFile(null)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition hover:text-slate-900"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <label className="flex h-full cursor-pointer flex-col items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnailFile(e.target.files[0])}
                      className="hidden"
                    />
                    <ImageIcon size={24} className="mb-2 text-slate-300" />
                    <span className="text-xs font-medium text-slate-500">Add thumbnail</span>
                  </label>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                A simple, clear thumbnail helps viewers understand your video faster.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-900">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Publish settings
              </h4>

              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  <span>Public visibility</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  <span>HQ format enabled</span>
                </div>
              </div>

              {uploading && (
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                    <span>Uploading</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Publishing...
                  </div>
                ) : (
                  "Publish video"
                )}
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                By publishing, you agree to the content guidelines.
              </p>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

export default Uploadvdo;
