import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from '../allComponents/layout/Loader';

const Login = React.lazy(() => import('../allComponents/userComponents/Login'));
const Signup = React.lazy(() => import('../allComponents/userComponents/Sigup'));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={null} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
