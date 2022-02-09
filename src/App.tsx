import React from 'react';

import { Route, Routes } from 'react-router-dom';

import EditIndex from 'pages/edit';
import HomeIndex from 'pages/home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeIndex />} />
      <Route path="/edit/*" element={<EditIndex />} />
    </Routes>
  );
};

export default App;
