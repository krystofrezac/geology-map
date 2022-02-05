import React from 'react';

import { Route, Routes } from 'react-router-dom';

import EditIndex from 'pages/edit';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/edit" element={<EditIndex />} />
    </Routes>
  );
};

export default App;
