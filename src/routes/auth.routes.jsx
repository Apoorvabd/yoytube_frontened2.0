import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = React.lazy(() => import('../allComponents/userComponents/Login'));
const Signup = React.lazy(() => import('../allComponents/userComponents/Sigup'));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
