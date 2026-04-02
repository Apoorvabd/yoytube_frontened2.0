import React, { useState } from "react";
import { UploadCloud, X, Film, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api, { getAuthHeaders } from "../../lib/api";
import AppShell from "../layout/AppShell";

/**
 * Uploadvdo component rewritten for a premium light theme.
 * Removed framer-motion in favor of native Tailwind transitions.
 * Uses UploadCloud from lucide-react and surface-card for consistency.
 */
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
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      toast.success("Masterpiece published successfully!");
      setTimeout(() => navigate("/Dashboard"), 1500);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Publishing failed");
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-primary/10 text-primary mb-6 animate-pulse">
            <UploadCloud size={32} />
          </div>
          <h1 className="text-5xl font-[1000] tracking-tight text-slate-900 leading-tight">
            Publish your <span className="text-primary italic">vision.</span>
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-500 max-w-xl mx-auto">
            Share your high-definition content with a global audience of creators and enthusiasts.
          </p>
        </header>

        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Areas */}
          <div className="lg:col-span-2 space-y-6">
            <div className="surface-card bg-white p-8 border-slate-200/60 shadow-xl shadow-slate-200/40">
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a captivating title"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-lg font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                    Story & Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your creation..."
                    className="w-full h-48 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-base font-medium text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <div className={`surface-card p-8 border-2 border-dashed transition-all duration-300 ${
              videoFile 
                ? "bg-indigo-50/50 border-indigo-200" 
                : "bg-white border-slate-200 hover:border-primary/40"
            }`}>
              {!videoFile ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:scale-110 transition-transform">
                    <Film size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Select your master file</h3>
                  <p className="text-sm font-medium text-slate-500 mb-8">MP4, WebM or OGG files up to 2GB supported.</p>
                  <label className="premium-btn-primary cursor-pointer px-10">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files[0])}
                      className="hidden"
                    />
                    Choose Video
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                      <Film size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 truncate max-w-[200px] md:max-w-xs">{videoFile.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Ready for processing</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setVideoFile(null)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <div className="surface-card bg-white p-6 border-slate-200/60 shadow-xl shadow-slate-200/40">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 block">
                Visual Cover
              </label>
              
              <div 
                className={`relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-300 ${
                  thumbnailFile 
                    ? "border-emerald-200 bg-emerald-50/20" 
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
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
                      onClick={() => setThumbnailFile(null)}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setThumbnailFile(e.target.files[0])} 
                      className="hidden" 
                    />
                    <ImageIcon size={24} className="text-slate-300 mb-2" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Add Thumbnail</span>
                  </label>
                )}
              </div>
              <p className="mt-4 text-[11px] font-medium text-slate-400 leading-relaxed italic">
                A professional thumbnail significantly increases your click-through rate.
              </p>
            </div>

            <div className="surface-card bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/20">
              <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Publish Settings
              </h4>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Public visibility</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>HQ format enabled</span>
                </div>
              </div>

              {uploading && (
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black tracking-widest uppercase">
                    <span>Compressing</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full premium-btn-primary h-14 bg-primary hover:bg-primary/90 text-white shadow-primary/20"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                    Publishing...
                  </div>
                ) : "Publish Masterpiece"}
              </button>
              
              <p className="mt-4 text-[10px] text-center font-bold text-slate-500 uppercase tracking-[0.1em]">
                By publishing, you agree to our Content Guidelines.
              </p>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

export default Uploadvdo;
