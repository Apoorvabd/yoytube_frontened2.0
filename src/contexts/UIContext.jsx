import { createContext, useState } from "react";

export const UIContext = createContext();

const UIProvider = ({ children }) => {
    const [more,setMore]=useState(false);
    const [newPlaylistS,setNewPlalistS]=useState(false);
    const [UsersSettings,setUsersSettings]=useState(false);

    return (
        <UIContext.Provider
            value={{
                more,
                setMore,
                newPlaylistS,
                setNewPlalistS,
                UsersSettings,
                setUsersSettings
            }}
        >
            {children}
        </UIContext.Provider>
    );
};

export default UIProvider;
