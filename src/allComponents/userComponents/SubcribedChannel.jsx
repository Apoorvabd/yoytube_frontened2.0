import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function SubscribedChannel() {

  const [subscribedChannel, setSubscribedChannel] = useState([]);

  const storedUser = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  // localStorage shape from Login.jsx: { user: { _id, fullName, ... }, accessToken, refreshToken }
  const userId = storedUser?.user?._id;
  const accessToken = storedUser?.accessToken;

  useEffect(() => {
    const fetchSubscribedChannels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/subscriptions/u/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setSubscribedChannel(response.data.data);

      } catch (err) {
        console.error(err);
        toast.error("Failed to load subscribed channels");
      }
    };

    if (userId) {
      fetchSubscribedChannels();
    }

  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Subscribed Channels</h2>

      {subscribedChannel.length === 0 ? (
        <p>You are not subscribed to any channels.</p>
      ) : (
        <ul className="space-y-4">
          {subscribedChannel.map((channel) => {
            const info = channel.channelInfo;

            return (
              <li key={channel._id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img
                  src={info?.avatar}
                  alt={info?.username}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h3 className="text-xl font-semibold">
                    {info?.name || info?.username}
                  </h3>

                  <p className="text-sm text-gray-500">
                    @{info?.username}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

    </div>
  );
}

export default SubscribedChannel;