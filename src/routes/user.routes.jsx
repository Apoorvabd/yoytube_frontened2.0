import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const UserDashboard = React.lazy(() => import('../allComponents/userComponents/UserDashboard'));
const Uploadvdo = React.lazy(() => import('../allComponents/userComponents/Uploadvdo'));
const Playlist = React.lazy(() => import('../allComponents/userComponents/PlaylistComponents/Playlist'));
const SubscribedChannel = React.lazy(() => import('../allComponents/userComponents/SubcribedChannel'));
const UserProfile = React.lazy(() => import('../allComponents/userComponents/UserProfile'));
const UsersSettings = React.lazy(() => import('../allComponents/userComponents/UsersSettings'));
const PrivacyPolicy = React.lazy(() => import('../allComponents/userComponents/settingsForUser/PrivacyPolicy'));
const Help = React.lazy(() => import('../allComponents/userComponents/settingsForUser/Help'));
const AccountCenter = React.lazy(() => import('../allComponents/userComponents/settingsForUser/AccountCenter'));
const UpdateProfile = React.lazy(() => import('../allComponents/userComponents/settingsForUser/UpdateProfile'));
const LikedVdo = React.lazy(() => import('../allComponents/userComponents/LikedVdo'));
const WatchHistory = React.lazy(() => import('../allComponents/userComponents/Watchhistory'));
const Subscribers = React.lazy(() => import('../allComponents/userComponents/Subscribers'));
const DeleteVdo = React.lazy(() => import('../allComponents/vdoComponents/VdoFunctions/DeleteVdo'));
const UpdateVdo = React.lazy(() => import('../allComponents/vdoComponents/VdoFunctions/EditVdo'));
const PlaylistDetail = React.lazy(() => import('../allComponents/userComponents/PlaylistComponents/PlaylistDetail'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/Upload" element={<Uploadvdo />} />
        <Route path="/Dashboard" element={<UserDashboard />} />
        <Route path="/Playlist" element={<Playlist/>}/>
        <Route path="/subscriptions" element={<SubscribedChannel/>}/>
        <Route path="/channel/:id" element={<UserProfile />} />
        <Route path="/settings" element={<UsersSettings />} />
        <Route path="/settings/privacy" element={<PrivacyPolicy />} />
        <Route path="/settings/help" element={<Help/>}/>
        <Route path="/settings/accountcenter" element={<AccountCenter/>}/>
        <Route path="/settings/accountcenter/updateprofile" element={<UpdateProfile/>}/>
        <Route path="/liked-videos" element={<LikedVdo/>}/>
        <Route path="/history" element={<WatchHistory/>}/>
        <Route path="/subscribers" element={<Subscribers/>}/>
        <Route path="/deletevideo/:id" element={<DeleteVdo/>}/>
        <Route path="/updatevideo/:id" element={<UpdateVdo/>}/>
        <Route path="/playlist/:id" element={<PlaylistDetail/>}/>
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
