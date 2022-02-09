import React from 'react';

import { Route, Routes } from 'react-router-dom';

import AreaIndex from 'pages/edit/area';
import EditIndex from 'pages/edit/index';
import HomeIndex from 'pages/home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeIndex />} />
      <Route path="/edit" element={<EditIndex />} />
      <Route path="/edit/area/:areaId" element={<AreaIndex />} />
    </Routes>
  );
};

export default App;
