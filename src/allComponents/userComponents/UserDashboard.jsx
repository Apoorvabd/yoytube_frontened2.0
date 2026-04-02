import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import Card_for_vd0 from '../vdoComponents/Card_for_vd0';
import { CgDetailsMore } from "react-icons/cg";
import UserMore from './Userfunctionalitiesboard';
import api, { getStoredUser, getAuthHeaders } from '@/lib/api';
import AppShell from '../layout/AppShell';


export default function UserDashboard() {
    const navigate = useNavigate();

    const { user, setUser } = useContext(DataContext);
    const {more,setMore}=useContext(DataContext);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({
        totalLikes: 0,
        totalSubscribers: 0,
        totalVideos: 0,
        totalViews: 0,

    });



    const storedUser = getStoredUser();


    

    useEffect(() => {
        async function fetchVideos() {
            try {
                const saved = getStoredUser();
                
                if (!saved?.accessToken) {
                    setError("Please login to view dashboard");
                    setLoading(false);
                    return;
                }

                // only update context if it isn't already set or has changed
                if (!user || user.accessToken !== saved.accessToken) {
                    setUser(saved);
                }

                const response = await api.get("/dashboard/videos", {
                    headers: getAuthHeaders(),
                });

                console.log("Videos fetch response:", response.data);

                const fetched = response.data?.data || [];
                
                setVideos(fetched);
                setError("");
                console.log("fetched videos: iam from user dasshboard", fetched);

            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) {
                    localStorage.removeItem("user");
                    navigate("/Login");
                    return;
                }
                setError("Failed to fetch your videos");
            } finally {
                setLoading(false);
            }
        }
        const getChannelStats = async () => {
            try {
                const saved = getStoredUser();
                if (!saved?.accessToken) {
                    return;
                }
                const response = await api.get("/dashboard/stats", {
                    headers: getAuthHeaders(),
                });
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
        <AppShell>
            <div className="space-y-6 pb-6">
                {more && <UserMore />}

                <section className="surface-glass relative h-56 overflow-hidden md:h-64">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-35"
                        style={{ backgroundImage: `url(${storedUser?.user?.avatar || "/hero.jfif"})` }}
                    />
                    <div className="relative flex h-full items-end justify-between bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">Creator Space</p>
                            <h1 className="mt-2 text-3xl font-black text-foreground">Welcome back, {storedUser?.user?.username || "Creator"}</h1>
                        </div>
                        <button
                            className="rounded-full border border-border bg-muted/20 p-2.5 text-foreground transition hover:bg-muted"
                            onClick={() => setMore(true)}
                        >
                            <CgDetailsMore className="text-2xl" />
                        </button>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="surface-card p-4 text-center">
                        <p className="text-3xl font-bold text-foreground">{videos.length}</p>
                        <p className="mt-1 text-sm font-semibold text-muted-foreground">Videos</p>
                    </div>
                    <button className="surface-card p-4 text-center hover:bg-muted/30 transition-colors" onClick={() => navigate("/subscribers")}>
                        <p className="text-3xl font-bold text-foreground">{stats.totalSubscribers || 0}</p>
                        <p className="mt-1 text-sm font-semibold text-muted-foreground">Subscribers</p>
                    </button>
                    <div className="surface-card p-4 text-center">
                        <p className="text-3xl font-bold text-foreground">{stats.totalViews || 0}</p>
                        <p className="mt-1 text-sm font-semibold text-muted-foreground">Views</p>
                    </div>
                    <div className="surface-card p-4 text-center">
                        <p className="text-3xl font-bold text-foreground">{stats.totalLikes || 0}</p>
                        <p className="mt-1 text-sm font-semibold text-muted-foreground">Likes</p>
                    </div>
                </section>

                <section className="surface-card p-5 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-foreground">Your Videos ({videos.length})</h2>
                        <button onClick={() => navigate("/Upload")} className="accent-btn text-sm">Upload New</button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="aspect-video rounded-xl shimmer" />
                                    <div className="h-3 w-3/4 rounded-full shimmer" />
                                    <div className="h-3 w-1/2 rounded-full shimmer" />
                                </div>
                            ))}
                        </div>
                    ) : videos.length === 0 ? (
                        <p className="text-sm text-[#b3b3b3]">No videos yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {videos.map((v) => (
                                <Card_for_vd0 key={v._id || v.id} video={v} />
                            ))}
                        </div>
                    )}

                    {!!error && <p className="mt-3 text-sm text-[#ff7b82]">{error}</p>}
                </section>
            </div>
        </AppShell>
    );
}