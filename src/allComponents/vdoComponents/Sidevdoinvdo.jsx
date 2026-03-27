import Card_for_vd0 from "./Card_for_vd0";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../../Context/UserContext";

function Sidevdoinvdo() {
  const ctx = useContext(DataContext);
  if (!ctx) return null;

  const { videos, setVideos } = ctx;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sampleVideos = [
    {
      _id: "sample1",
      title: "Sample Flower Video",
      description: "A fallback sample video",
      thumbnail: "/hero.jfif",
      owner: { username: "Demo", avatar: "/logo.png" },
      createdAt: new Date().toISOString(),
      views: 123,
    },
  ];

  useEffect(() => {
    const getallvdo = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser?.accessToken) {
          setError("Please log in to view videos");
          setVideos(sampleVideos);
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          "http://localhost:8000/api/v1/videos/",
          {
            headers: {
              Authorization: `Bearer ${storedUser.accessToken}`,
            },
          }
        );

        const videosData = data?.data?.videos || [];

        if (videosData.length > 0) {
          setVideos(videosData);
          setError(null);
        } else {
          setVideos(sampleVideos);
          setError(null);
        }
      } catch (err) {
        setError("Could not fetch videos. Showing sample data.");
        setVideos(sampleVideos);
      } finally {
        setLoading(false);
      }
    };

    getallvdo();
  }, []);

  const recommended = (videos || []).slice(0, 8);

  return (
    <section className="space-y-3">
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-24 rounded-xl shimmer" />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="rounded-xl border border-white/10 bg-[#181818] p-3 text-sm text-[#d8d8d8]">{error}</p>
      )}

      {!loading && recommended.length > 0 ? (
        <div className="space-y-3">
          {recommended.map((video) => (
            <Card_for_vd0 key={video._id} video={video} compact />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="rounded-xl border border-dashed border-white/10 bg-[#181818] p-3 text-center text-sm text-[#b3b3b3]">
            No videos available
          </p>
        )
      )}
    </section>
  );
}

export default Sidevdoinvdo;
