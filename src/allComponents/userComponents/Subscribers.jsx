import React, { useState, useEffect } from "react";
import axios from "axios";


function Subscribers(){

    const [subscribers, setSubscribers] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const channelId = storedUser?.user?._id;
    const accessToken = storedUser?.accessToken;

    useEffect(() => {
        const fetchSubscribers = async () => {
           console.log("hvh");
           

            try {
                const response = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response);
                

                const subscriberList = Array.isArray(response.data?.data) ? response.data.data : [];
                setSubscribers(subscriberList);
                console.log("Fetched subscribers:", subscriberList);
            } catch (error) {
                console.log("Error fetching subscribers:", error);
                setSubscribers([]);
            }
        };
        if (channelId) {
            fetchSubscribers();
        }
    }, [channelId, accessToken]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Subscribers</h2>

            {(Array.isArray(subscribers) ? subscribers : []).length === 0 ? (
                <p>No subscribers yet.</p>
            ) : (
                <ul className="space-y-4">
                    {(Array.isArray(subscribers) ? subscribers : []).map((subscriber) => {
                        const info = subscriber?.subscriberInfo;

                        return (
                            <li key={info?._id} className="flex items-center gap-4 p-4 border rounded-lg">
                                <img
                                    src={info?.avatar}
                                    alt={info?.username}
                                    className="w-12 h-12 rounded-full"
                                />

                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {info?.name || info?.username}
                                    </h3>
                                    <p className="text-sm text-gray-500">@{info?.username}</p>
                                    <p className="text-sm text-gray-500">{info?.email}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

        </div>
    );
}
export default Subscribers;