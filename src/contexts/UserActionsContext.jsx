import { createContext, useState } from "react";

export const UserActionsContext = createContext();

const UserActionsProvider = ({ children }) => {
    const [subscribedChannel, setSubscribedChannel] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [subscribers,showSubscribers]=useState(false)

    return (
        <UserActionsContext.Provider
            value={{
                subscribedChannel,
                setSubscribedChannel,
                userProfile,
                setUserProfile,
                subscribers,
                showSubscribers
            }}
        >
            {children}
        </UserActionsContext.Provider>
    );
};

export default UserActionsProvider;
