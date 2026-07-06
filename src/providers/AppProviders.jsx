import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '../contexts/AuthContext';
import VideoProvider from '../contexts/VideoContext';
import UserActionsProvider from '../contexts/UserActionsContext';
import UIProvider from '../contexts/UIContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,   // 2 minutes
      retry: 1,
    },
  },
});

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <VideoProvider>
          <UserActionsProvider>
            <UIProvider>{children}</UIProvider>
          </UserActionsProvider>
        </VideoProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
