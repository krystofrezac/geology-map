import React from 'react';

import { Route, Routes } from 'react-router-dom';

import EditIndex from 'pages/edit';
import HomeIndex from 'pages/home';
import PresentationIndex from 'pages/presentation';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeIndex />} />
      <Route path="/edit/*" element={<EditIndex />} />
      <Route path="/presentation/*" element={<PresentationIndex />} />
    </Routes>
  );
};

export default App;
