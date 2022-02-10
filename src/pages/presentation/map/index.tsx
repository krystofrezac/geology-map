import React from 'react';

import { MapEventListener } from 'react-mapycz';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'store/hooks';
import { openDetailArea } from 'store/slices/presentation';

import MapComponent from 'components/map';

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

  const handleMapEvent: MapEventListener = (event, coords) => {
    handlePresentationMapEvent(event, coords);
  };

  return (
    <MapComponent onEvent={handleMapEvent}>
      <Routes>
        <Route path="/" element={<PresentationMap />} />
      </Routes>
    </MapComponent>
  );
};

export default MapIndex;
