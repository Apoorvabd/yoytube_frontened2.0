import React, { useState } from "react";
import toast from "react-hot-toast";
import api, { getAuthHeaders, getStoredUser } from "@/lib/api";
import { useNavigate } from "react-router-dom";

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

  // ================= DETAILS =================
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error("Full name and email are required");
      return;
    }

    try {
      setDetailsLoading(true);
      const response = await api.post(
        "/users/updateProfile",
        { fullName, email },
        {
          headers: getAuthHeaders(),
        }
      );

      const updatedUser = response.data?.data;
      if (updatedUser && storedUser?.accessToken) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...storedUser,
            user: {
              ...storedUser.user,
              ...updatedUser,
            },
          })
        );
      }

      toast.success("Profile updated successfully ✅");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Error updating profile ❌");
    } finally {
      setDetailsLoading(false);
    }
  };

  // ================= AVATAR =================
  const handleAvatarSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!avatarFile) {
        toast.error("Select avatar first");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", avatarFile);

      setAvatarLoading(true);
      const response = await api.patch(
        "/users/updateavatar",
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Avatar updated ✅");
      setAvatarFile(null);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Error updating avatar ❌");
    } finally {
      setAvatarLoading(false);
    }
  };

  // ================= COVER =================
  const handleCoverSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!coverFile) {
        toast.error("Select cover image first");
        return;
      }

      const formData = new FormData();
      formData.append("coverImage", coverFile);

      setCoverLoading(true);
      const response = await api.patch(
        "/users/updatecover",
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Cover updated ✅");
      setCoverFile(null);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Error updating cover ❌");
    } finally {
      setCoverLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-10">

        <h2 className="text-3xl font-bold text-center">Update Profile</h2>
        <button
          type="button"
          className="w-fit rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        {/* ================= DETAILS FORM ================= */}
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold">Edit Details</h3>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={storedUser?.user?.fullName || "Full Name"}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={storedUser?.user?.email || "Email"}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button disabled={detailsLoading} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-60">
            {detailsLoading ? "Updating..." : "Update Details"}
          </button>
        </form>

        {/* ================= AVATAR FORM ================= */}
        <form onSubmit={handleAvatarSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold">Update Avatar</h3>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button disabled={avatarLoading} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60">
            {avatarLoading ? "Uploading..." : "Upload Avatar"}
          </button>
        </form>

        {/* ================= COVER FORM ================= */}
        <form onSubmit={handleCoverSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold">Update Cover Image</h3>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button disabled={coverLoading} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-60">
            {coverLoading ? "Uploading..." : "Upload Cover"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default UpdateProfile;