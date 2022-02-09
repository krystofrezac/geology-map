import React from 'react';

import { useSelector } from 'store/hooks';
import { findArea } from 'store/slices/areas';

import Map from './map';

const MapIndex: React.FC = () => {
  const { areas, editingAreaCoords, markerShowArea, movingCoords } =
    useSelector(state => ({
      areas: state.areas.areas,
      editingAreaCoords: findArea(
        state.areas.areas,
        state.areas.editingAreaCoords,
      ),
      markerShowArea: findArea(state.areas.areas, state.areas.markerShowArea),
      movingCoords: state.areas.movingCoords,
    }));

  return (
    <Map
      areas={areas}
      editingAreaCoords={editingAreaCoords}
      markerShowArea={markerShowArea}
      movingCoords={movingCoords}
    />
  );
};

export default MapIndex;
