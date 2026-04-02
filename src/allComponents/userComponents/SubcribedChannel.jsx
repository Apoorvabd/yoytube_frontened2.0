

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import AppShell from "../layout/AppShell";

function SubscribedChannel() {

  const [subscribedChannel, setSubscribedChannel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  // localStorage shape from Login.jsx: { user: { _id, fullName, ... }, accessToken, refreshToken }
  const userId = storedUser?.user?._id;
  const accessToken = storedUser?.accessToken;

  useEffect(() => {
    const fetchSubscribedChannels = async () => {
      try {
        const response = await api.get(
          `/subscriptions/u/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setSubscribedChannel(response.data.data);
        setError("");

      } catch (err) {
        console.error(err);
        setError("Failed to load subscribed channels");
        toast.error("Failed to load subscribed channels");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSubscribedChannels();
    }

  }, [userId]);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-black text-foreground">Subscribed Channels</h1>

        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl shimmer" />
            ))}
          </div>
        )}

        {error && <p className="text-sm font-bold text-red-500 bg-red-500/10 p-4 rounded-xl">{error}</p>}

        {!loading && subscribedChannel.length === 0 ? (
          <div className="surface-card p-20 text-center">
            <p className="text-lg font-bold text-foreground">No subscriptions yet</p>
            <p className="text-sm text-muted-foreground mt-1">Channels you subscribe to will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscribedChannel.map((channel) => {
              const info = channel.channelInfo;

              return (
                <div key={channel._id} className="surface-card flex items-center gap-4 p-5 hover:bg-muted/30 transition-all cursor-pointer group">
                  <img
                    src={info?.avatar}
                    alt={info?.username}
                    className="w-16 h-16 rounded-full border-2 border-border group-hover:border-[#E50914] transition-colors"
                  />

                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-lg font-bold text-foreground truncate">
                      {info?.name || info?.username}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      @{info?.username}
                    </p>
                  </div>
                  
                  <button className="rounded-full bg-muted px-4 py-2 text-xs font-bold text-foreground hover:bg-[#E50914] hover:text-white transition-all">
                    Subscribed
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default SubscribedChannel;