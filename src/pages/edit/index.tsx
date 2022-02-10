import React from 'react';

import { ChevronLeftIcon } from '@heroicons/react/outline';
import { Link, Route, Routes } from 'react-router-dom';

import IconButtonIndex from 'components/iconButton';

import Edit from './index/index';
import AreaIndex from './area';
import MapIndex from './map';

const EditIndex: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-10 p-2">
        <Link to="/">
          <IconButtonIndex className="w-12 h-12 btn-md">
            <ChevronLeftIcon className="w-6 h-6" />
          </IconButtonIndex>
        </Link>
      </div>
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
