import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  areaStopMovingCoordinates,
  hideAreaMarkers,
  stopEditingAreaCoords,
} from 'store/slices/areas';

import BottomInfo from './bottomInfo';

const BottomInfoIndex: React.FC = () => {
  const { movingCoords, editingAreaCoords, markerShowArea } = useSelector(
    state => ({
      movingCoords: state.areas.movingCoords,
      editingAreaCoords: state.areas.editingAreaCoords,
      markerShowArea: state.areas.markerShowArea,
    }),
  );
  const dispatch = useDispatch();

  const handleMarkerMoveCancel = (): void => {
    dispatch(areaStopMovingCoordinates());
  };

  const handleAreaEditCoordsEnd = (): void => {
    dispatch(stopEditingAreaCoords());
  };

  const handleHideAreaMarkers = (): void => {
    dispatch(hideAreaMarkers());
  };

  return (
    <BottomInfo
      movingCoords={movingCoords !== undefined}
      editingAreaCoords={editingAreaCoords !== undefined}
      markerShowArea={markerShowArea !== undefined}
      onMarkerMoveCancel={handleMarkerMoveCancel}
      onAreaEditCoordsEnd={handleAreaEditCoordsEnd}
      onHideAreaMarkers={handleHideAreaMarkers}
    />
  );
};

export default BottomInfoIndex;
