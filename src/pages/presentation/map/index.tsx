import React from 'react';

import { MapEventListener } from 'react-mapycz';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'store/hooks';
import { openDetailArea, openDetailDeposit } from 'store/slices/presentation';

import MapComponent from 'components/map';

import AreaMap from '../area/map';
import PresentationMap from '../index/map';

const MapIndex: React.FC = () => {
  const dispatch = useDispatch();

  const handlePresentationMapEvent: MapEventListener = event => {
    // @ts-ignore
    if (event.type === 'geometry-click') {
      // eslint-disable-next-line no-underscore-dangle
      dispatch(openDetailArea({ areaId: event.target._id }));
    }
  };

  const handleAreaMapEvent: MapEventListener = event => {
    // @ts-ignore
    if (event.type === 'geometry-click') {
      // eslint-disable-next-line no-underscore-dangle
      dispatch(openDetailDeposit({ depositId: event.target._id }));
    }
  };

  const handleMapEvent: MapEventListener = (event, coords) => {
    if (window.location.pathname === '/presentation')
      handlePresentationMapEvent(event, coords);
    else handleAreaMapEvent(event, coords);
  };

  return (
    <MapComponent onEvent={handleMapEvent}>
      <Routes>
        <Route path="/" element={<PresentationMap />} />
        <Route path="/area/:areaId" element={<AreaMap />} />
      </Routes>
    </MapComponent>
  );
};

export default MapIndex;
