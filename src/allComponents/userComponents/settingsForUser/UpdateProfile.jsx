import React, { useState } from "react";
import axios from "axios";

function UpdateProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  // ================= DETAILS =================
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/updateProfile",
        { fullName, email },
        {
          headers: {
            Authorization: `Bearer ${storedUser?.accessToken}`,
          },
        }
      );

      toast.success("Profile updated successfully ✅");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast("Error updating profile ❌");
    }
  };

  // ================= AVATAR =================
  const handleAvatarSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!avatarFile) {
        alert("Select avatar first");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/updateavatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedUser?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Avatar updated ✅");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      alert("Error updating avatar ❌");
    }
  };

  // ================= COVER =================
  const handleCoverSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!coverFile) {
        alert("Select cover image first");
        return;
      }

      const formData = new FormData();
      formData.append("coverImage", coverFile);

      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/updatecover",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedUser?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Cover updated ✅");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      alert("Error updating cover ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-10">

        <h2 className="text-3xl font-bold text-center">Update Profile</h2>

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

          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
            Update Details
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

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Upload Avatar
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

          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Upload Cover
          </button>
        </form>

      </div>
    </div>
  );
}

export default UpdateProfile;