import React, { useState } from "react";
import toast from "react-hot-toast";
import api, { getAuthHeaders, getStoredUser } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import AppShell from "../../layout/AppShell";
import { ArrowLeft } from "lucide-react";

function UpdateProfile() {
  const navigate = useNavigate();
  const storedUser = getStoredUser() || {};

  const [email, setEmail] = useState(storedUser?.user?.email || "");
  const [fullName, setFullName] = useState(storedUser?.user?.fullName || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error("Full name and email are required");
      return;
    }
    try {
      setDetailsLoading(true);
      const response = await api.post("/users/updateProfile", { fullName, email }, { headers: getAuthHeaders() });
      const updatedUser = response.data?.data;
      if (updatedUser && storedUser?.accessToken) {
        localStorage.setItem("user", JSON.stringify({ ...storedUser, user: { ...storedUser.user, ...updatedUser } }));
      }
      toast.success("Profile updated successfully ✅");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating profile ❌");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!avatarFile) { toast.error("Select an avatar first"); return; }
    try {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      await api.patch("/users/updateavatar", formData, { headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" } });
      toast.success("Avatar updated ✅");
      setAvatarFile(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating avatar ❌");
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleCoverSubmit = async (e) => {
    e.preventDefault();
    if (!coverFile) { toast.error("Select a cover image first"); return; }
    try {
      setCoverLoading(true);
      const formData = new FormData();
      formData.append("coverImage", coverFile);
      await api.patch("/users/updatecover", formData, { headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" } });
      toast.success("Cover updated ✅");
      setCoverFile(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating cover ❌");
    } finally {
      setCoverLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/10 py-10 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-0.5">Account Center</p>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Edit Profile</h1>
            </div>
          </div>

          <div className="space-y-4">

            {/* Details Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">✏️</span>
                <h2 className="text-base font-black text-slate-800 dark:text-slate-100">Personal Details</h2>
              </div>
              <form onSubmit={handleDetailsSubmit} className="space-y-3">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={storedUser?.user?.fullName || "Full Name"}
                  className="input-premium"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={storedUser?.user?.email || "Email Address"}
                  className="input-premium"
                />
                <button
                  type="submit"
                  disabled={detailsLoading}
                  className="premium-btn-primary w-full mt-1 disabled:opacity-60"
                >
                  {detailsLoading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>

            {/* Avatar Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">🖼️</span>
                <h2 className="text-base font-black text-slate-800 dark:text-slate-100">Profile Picture</h2>
              </div>
              <form onSubmit={handleAvatarSubmit} className="space-y-3">
                <label className="block w-full cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files[0])}
                    className="hidden"
                  />
                  <span className="text-sm font-semibold text-slate-400">
                    {avatarFile ? avatarFile.name : "Click to select image"}
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={avatarLoading}
                  className="premium-btn-primary w-full disabled:opacity-60"
                >
                  {avatarLoading ? "Uploading..." : "Upload Avatar"}
                </button>
              </form>
            </div>

            {/* Cover Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">🌄</span>
                <h2 className="text-base font-black text-slate-800 dark:text-slate-100">Cover Image</h2>
              </div>
              <form onSubmit={handleCoverSubmit} className="space-y-3">
                <label className="block w-full cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files[0])}
                    className="hidden"
                  />
                  <span className="text-sm font-semibold text-slate-400">
                    {coverFile ? coverFile.name : "Click to select image"}
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={coverLoading}
                  className="premium-btn-primary w-full disabled:opacity-60"
                >
                  {coverLoading ? "Uploading..." : "Upload Cover"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default UpdateProfile;