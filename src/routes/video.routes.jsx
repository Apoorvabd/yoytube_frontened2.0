import React, { Suspense } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

const Hero = React.lazy(() => import('../allComponents/userComponents/Hero'));
const Showvdo = React.lazy(() => import('../allComponents/vdoComponents/Showvdo'));

// wrapper that keys Showvdo by id so it fully remounts when the parameter changes
function VideoWrapper() {
    const { id } = useParams();
    return <Showvdo key={id} />;
  }

const VideoRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/video/:id"
          element={<VideoWrapper />}
        />
      </Routes>
    </Suspense>
  );
};

export default VideoRoutes;
