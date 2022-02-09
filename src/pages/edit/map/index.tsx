import React from 'react';

import { MapEventListener } from 'react-mapycz';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'store/hooks';
import {
  addAreaCoordinates,
  addDepositCoords,
  areaMoveCoordinates,
  moveEditingDepositMarker,
  startEditingDepositMarker,
  startEditingMarker,
} from 'store/slices/areas';

import MapComponent from 'components/map';

import AreaMap from '../area/map';
import EditMap from '../index/map';

const MapIndex: React.FC = () => {
  const dispatch = useDispatch();

  const handleMapEventIndex: MapEventListener = (event, coords) => {
    // @ts-ignore
    if (event.type === 'marker-click') {
      dispatch(
        startEditingMarker({
          // eslint-disable-next-line no-underscore-dangle
          lng: event.target._coords.x,
          // eslint-disable-next-line no-underscore-dangle
          lat: event.target._coords.y,
        }),
      );
    }
    if (event.type === 'map-click' && coords) {
      dispatch(
        areaMoveCoordinates({
          coords: { lng: coords.x, lat: coords.y },
        }),
      );
      dispatch(
        addAreaCoordinates({ coords: { lng: coords.x, lat: coords.y } }),
      );
    }
  };
  const handleMapEventArea: MapEventListener = (event, coords): void => {
    // @ts-ignore
    if (event.type === 'marker-click') {
      dispatch(
        startEditingDepositMarker({
          coords: {
            // eslint-disable-next-line no-underscore-dangle
            lng: event.target._coords.x,
            // eslint-disable-next-line no-underscore-dangle
            lat: event.target._coords.y,
          },
        }),
      );
    }
    if (event.type === 'map-click') {
      dispatch(
        addDepositCoords({
          coords: { lng: coords.x, lat: coords.y },
        }),
      );
      dispatch(
        moveEditingDepositMarker({
          coords: { lng: coords.x, lat: coords.y },
        }),
      );
    }
  };
  const handleMapEvent: MapEventListener = (event, coords) => {
    if (window.location.pathname === '/edit')
      handleMapEventIndex(event, coords);
    else handleMapEventArea(event, coords);
  };

  return (
    <MapComponent onEvent={handleMapEvent}>
      <Routes>
        <Route path="/" element={<EditMap />} />
        <Route path="/area/:areaId" element={<AreaMap />} />
      </Routes>
    </MapComponent>
  );
};

export default MapIndex;
