import React from "react";
import Login from "./allComponents/userComponents/Login";
import Hero from "./allComponents/userComponents/Hero";
import Sigup from "./allComponents/userComponents/Sigup";
import { useContext } from "react";
import { DataContext } from "./Context/UserContext";
import { Routes } from "react-router-dom";
import { BrowserRouter} from "react-router-dom";
import { Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./allComponents/userComponents/UserDashboard";
import Uploadvdo from "./allComponents/userComponents/Uploadvdo";
import Showvdo from "./allComponents/vdoComponents/Showvdo";
import { useParams } from "react-router-dom";
import Playlist from "./allComponents/userComponents/PlaylistComponents/Playlist";
import SubscribedChannel from "./allComponents/userComponents/SubcribedChannel";
import UserProfile from "./allComponents/userComponents/UserProfile";
import UsersSettings from "./allComponents/userComponents/UsersSettings";
import PrivacyPolicy from "./allComponents/userComponents/settingsForUser/PrivacyPolicy";
import Help from "./allComponents/userComponents/settingsForUser/Help";
import AccountCenter from "./allComponents/userComponents/settingsForUser/AccountCenter";
import UpdateProfile from "./allComponents/userComponents/settingsForUser/UpdateProfile";
import LikedVdo from "./allComponents/userComponents/LikedVdo";
import WatchHistory from "./allComponents/userComponents/Watchhistory";
import Subscribers from "./allComponents/userComponents/Subscribers";
import DeleteVdo from "./allComponents/vdoComponents/VdoFunctions/DeleteVdo";
import UpdateVdo from "./allComponents/vdoComponents/VdoFunctions/UpdateVdo";
import PlaylistDetail from "./allComponents/userComponents/PlaylistComponents/PlaylistDetail";

// wrapper that keys Showvdo by id so it fully remounts when the parameter changes
function VideoWrapper() {
  const { id } = useParams();
  return <Showvdo key={id} />;
}


export default function App() {
  const ctx = useContext(DataContext);
  if (!ctx) return null;

  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sigup />} />
        <Route path="/Upload" element={<Uploadvdo />} />
        <Route path="/Dashboard" element={<UserDashboard />} />
        <Route path="/Playlist" element={<Playlist/>}/>
        <Route path="/subscriptions" element={<SubscribedChannel/>}/>
        <Route path="/channel/:id" element={<UserProfile />} />
        < Route path="/settings" element={<UsersSettings />} />
        < Route path="/settings/privacy" element={<PrivacyPolicy />} />
        <Route path="/settings/help" element={<Help/>}/>
        <Route path="/settings/accountcenter" element={<AccountCenter/>}/>
        <Route path="/settings/accountcenter/updateprofile" element={<UpdateProfile/>}/>
        {/* wrap Showvdo in a wrapper with key so it remounts when id changes */}
        <Route
          path="/video/:id"
          element={<VideoWrapper />}
        />
        <Route path="/liked-videos" element={<LikedVdo/>}/>
        <Route path="/history" element={<WatchHistory/>}/>
        <Route path="/subscribers" element={<Subscribers/>}/>
        <Route path="/deletevideo/:id" element={<DeleteVdo/>}/>
        <Route path="/updatevideo/:id" element={<UpdateVdo/>}/>
        <Route path="/playlist/:id" element={<PlaylistDetail/>}/>
        </Routes>
       <Toaster position="top-right" />

       
    </BrowserRouter>
  );
}