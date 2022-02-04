import React from 'react';

import { Route, Routes } from 'react-router-dom';

import AreasIndex from 'pages/areas';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/edit" element={<AreasIndex />} />
    </Routes>
  );
};

export default App;
