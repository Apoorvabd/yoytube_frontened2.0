import React from 'react';
import AuthProvider from '../contexts/AuthContext';
import VideoProvider from '../contexts/VideoContext';
import UserActionsProvider from '../contexts/UserActionsContext';
import UIProvider from '../contexts/UIContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <VideoProvider>
        <UserActionsProvider>
          <UIProvider>{children}</UIProvider>
        </UserActionsProvider>
      </VideoProvider>
    </AuthProvider>
  );
};

export default AppProviders;
