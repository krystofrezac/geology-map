import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  hideDepositMarkers,
  stopEditingDepositCoords,
  stopMovingEditingDepositMarker,
} from 'store/slices/areas';

import BottomInfo from './bottomInfo';

const BottomInfoIndex: React.FC = () => {
  const { movingCoords, editingCoords, showMarkers } = useSelector(state => ({
    movingCoords: state.areas.movingEditingDepositCoordsIndex !== undefined,
    editingCoords: state.areas.editingDepositCoords !== undefined,
    showMarkers: state.areas.markerShowDeposit !== undefined,
  }));
  const dispatch = useDispatch();

  const handleMarkerMoveCancel = (): void => {
    dispatch(stopMovingEditingDepositMarker());
  };

  const handleAreaEditCoordsEnd = (): void => {
    dispatch(stopEditingDepositCoords());
  };

  const handleHideAreaMarkers = (): void => {
    dispatch(hideDepositMarkers());
  };

  return (
    <BottomInfo
      movingCoords={movingCoords}
      editingCoords={editingCoords}
      showMarkers={showMarkers}
      onMarkerMoveCancel={handleMarkerMoveCancel}
      onDepositEditCoordsEnd={handleAreaEditCoordsEnd}
      onHideDepositMarkers={handleHideAreaMarkers}
    />
  );
};

export default BottomInfoIndex;
