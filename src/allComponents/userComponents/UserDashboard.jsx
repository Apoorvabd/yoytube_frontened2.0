import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../Context/UserContext';
import Uploadvdo from './Uploadvdo';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import Card_for_vd0 from '../vdoComponents/Card_for_vd0';
import { CgDetailsMore } from "react-icons/cg";
import UserMore from './Userfunctionalitiesboard';
import { url } from 'zod';


export default function UserDashboard() {
    const navigate = useNavigate();

    const { user, setUser,showSubscribers } = useContext(DataContext);
    const {more,setMore}=useContext(DataContext);
    const [videos, setVideos] = useState([]);
    const [stats, setStats] = useState({
        totalLikes: 0,
        totalSubscribers: 0,
        totalVideos: 0,
        totalViews: 0,

    });



    const storedUser = JSON.parse(localStorage.getItem("user"));

    

    useEffect(() => {
        async function fetchVideos() {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                
                if (!storedUser?.accessToken) {
                    console.log("No stored user token found — skipping videos fetch.");
                    return;
                }

                // only update context if it isn't already set or has changed
                if (!user || user.accessToken !== storedUser.accessToken) {
                    setUser(storedUser);
                }

                const response = await axios.get(
                    "http://localhost:8000/api/v1/dashboard/videos",
                    {
                        headers: {
                            Authorization: `Bearer ${storedUser.accessToken}`,
                        },
                    }
                );

                console.log("Videos fetch response:", response.data);

                const fetched = response.data?.data || [];
                
                setVideos(fetched);
                console.log("fetched videos: iam from user dasshboard", fetched);

            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) {
                    localStorage.removeItem("user");
                    navigate("/Login");
                }
            }
        }
        const getChannelStats = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (!storedUser?.accessToken) {
                    console.log("No stored user token found — skipping stats fetch.");
                    return;
                }
                const response = await axios.get(
                    "http://localhost:8000/api/v1/dashboard/stats",{
                        headers:{
                            Authorization:`Bearer ${storedUser.accessToken}`
                        }
                    }
                );
                console.log("Stats fetch response:", response.data);
                const stats = response.data?.data || {};
                setStats((prev) => ({ ...prev, ...stats }));
            } catch (err) {
                console.error("Error fetching channel stats:", err);    
            }
        }
        getChannelStats();
        fetchVideos();
    }, [navigate]);
    return (
        <div className="min-h-screen bg-[#ebe6e6] text-white font-sans pb-20">
            {more && <UserMore/>}
      <div className="relative mt-10 w-full h-60 overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-40"
    style={{ backgroundImage: `url(${storedUser?.user.avatar})` }}
  />
  <div className="relative flex h-full items-end justify-between bg-gradient-to-t from-slate-900/80 to-transparent p-4 text-white">
    <p className="text-lg font-semibold">Welcome back</p>
    <button
      className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
      onClick={() => setMore(true)}
    >
      <CgDetailsMore className="text-2xl" />
    </button>
  </div>
</div>

                <div className="max-w-6xl mx-auto space-y-8bg-cover bg-center rounded-lg p-6 animate-fade-up">
                   

                    <div className="theme-card shadow rounded-lg p-6 md:flex md:items-center md:justify-between animate-fade-up">
                    <div className="flex items-center gap-4">
                        <img
                            src={storedUser?.user.avatar}
                            alt={storedUser.user?.fullName}
                                className="w-20 h-20 rounded-full object-cover ring-2 ring-red-100"
                        />
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">{storedUser.user?.username}</h1>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                            <p className="mt-2 text-sm text-gray-600">{user?.fullName}</p>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 grid grid-cols-4 gap-4 text-center md:w-1/3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{videos.length}</div>
                            <div className="text-xs text-gray-500">Videos</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800" onClick={()=>{showSubscribers(true),navigate("/subscribers")}}>{stats.totalSubscribers || 0}</div>
                            <div className="text-xs text-gray-500">Subscribers</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{stats.totalViews || 0}</div>
                            <div className="text-xs text-gray-500">Views</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{stats.totalLikes || 0}</div>
                            <div className="text-xs text-gray-500">Likes</div>
                        </div>
                    </div>
                </div>
                <div className="theme-card shadow rounded-lg p-6 animate-fade-up">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Your Videos ({videos.length})</h2>
                    </div>

                    {videos.length === 0 ? (
                        <p className="text-center text-gray-500">No videos yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {videos.map((v) => (
                                <Card_for_vd0 key={v._id || v.id} video={v} />
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={() => navigate("/Upload")} className="theme-accent py-2 px-4 rounded-md text-white w-full md:w-auto">Upload new Video</button>

            </div>
        </div>
    );
}