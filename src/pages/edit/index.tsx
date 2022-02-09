import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Edit from './index/index';
import AreaIndex from './area';
import MapIndex from './map';

const EditIndex: React.FC = () => {
  return (
    <>
      <MapIndex />
      <Routes>
        <Route element={<MapIndex />} />
        <Route path="/" element={<Edit />} />
        <Route path="/area/:areaId" element={<AreaIndex />} />
      </Routes>
    </>
  );
};

export default EditIndex;
