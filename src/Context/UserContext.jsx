import { createContext, useState } from "react";

export const DataContext = createContext();

const UserContext = ({ children }) => {

  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  
  const [videos, setVideos] = useState([]);
  const [sigup,setSignup]=useState(false);
  const [more,setMore]=useState(false);
  const [vdofunc,setVdofunc]=useState(false);
  const [newPlaylistS,setNewPlalistS]=useState(false);
  const [vdoTobeAdded,setVdoTobeAdded]=useState("");
  const [subscribedChannel, setSubscribedChannel] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [UsersSettings,setUsersSettings]=useState(false);
  const [logout,setLogout]=useState(false);
  const [changePassword,setChangePassword]=useState(false);
  const [subscribers,showSubscribers]=useState(false)
 

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        email,
        setEmail,
        videos,
        setVideos,
        sigup,
        setSignup,
        more,
        setMore,
        vdofunc,
        setVdofunc,
        newPlaylistS,
        setNewPlalistS,
        vdoTobeAdded,
        setVdoTobeAdded,
        subscribedChannel,
        setSubscribedChannel,
        userProfile,
        setUserProfile,
        UsersSettings,
        setUsersSettings,
        logout,
        setLogout,
        changePassword,
        setChangePassword,
        showSubscribers,
        subscribers

       
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;