

import { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/Context/UserContext';
import Card_for_vd0 from '../vdoComponents/Card_for_vd0';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import AppShell from '../layout/AppShell';

export default function LikedVdo() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(DataContext);
    const [likedVideos, setLikedVideos] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (!storedUser || !storedUser.accessToken) {
            navigate("/login");
        } else {
            fetchLikedVideos();
        }
    }, []);

    const fetchLikedVideos = async () => {
        try {
            const response = await api.get(
                `/likes/videos`
                ,{
                    headers: {
                        Authorization: `Bearer ${storedUser.accessToken}`,
                    },
                    }
            );

            setLikedVideos(response.data.data);
            console.log("Liked videos fetched successfully:", response.data.data);
        } catch (error) {
            console.error("Error fetching liked videos:", error);
        }
    };
      // Dependency array includes navigate and storedUser    

    
    return (
        <AppShell>
            <div className="space-y-6">
                <h2 className="text-3xl font-black text-foreground">Liked Videos</h2>
                
                {likedVideos.length === 0 ? (
                    <div className="surface-card p-20 text-center">
                        <p className="text-lg font-bold text-foreground">No liked videos yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Videos you like will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {likedVideos.map((video) => (
                            <Card_for_vd0 key={video._id} video={video} />
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}   
