import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from './auth.routes';
import VideoRoutes from './video.routes';
import UserRoutes from './user.routes';

const AppRoutes = () => {
  return (
    <>
      <AuthRoutes />
      <VideoRoutes />
      <UserRoutes />
    </>
  );
};

export default AppRoutes;
