import React from 'react';

import { ChevronLeftIcon } from '@heroicons/react/outline';
import { Link, Route, Routes } from 'react-router-dom';

import IconButtonIndex from 'components/iconButton';

import Presentation from './index/index';
import MapIndex from './map';

const PresentationIndex: React.FC = () => (
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
      <Route path="/" element={<Presentation />} />
    </Routes>
  </>
);

export default PresentationIndex;
