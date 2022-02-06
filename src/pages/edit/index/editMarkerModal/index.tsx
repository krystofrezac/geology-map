import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  areaStartMovingCoordinates,
  deleteAreaCoords,
  stopEditingMarker,
} from 'store/slices/areas';

import EditMarkerModal from './editMarkerModal';

const EditMarkerModalIndex: React.FC = () => {
  const { editingCoordsIndex, markerShowArea } = useSelector(state => ({
    editingCoordsIndex: state.areas.editingCoordsIndex,
    markerShowArea: state.areas.markerShowArea,
  }));
  const dispatch = useDispatch();

  const handleClose = (): void => {
    dispatch(stopEditingMarker());
  };

  const handleMarkerDelete = (): void => {
    if (!(markerShowArea && editingCoordsIndex !== undefined)) return;
    dispatch(
      deleteAreaCoords({
        areaId: markerShowArea,
        coordsIndex: editingCoordsIndex,
      }),
    );
  };

  const handleMarkerMove = (): void => {
    if (!(markerShowArea && editingCoordsIndex !== undefined)) return;
    dispatch(
      areaStartMovingCoordinates({
        areaId: markerShowArea,
        coordsIndex: editingCoordsIndex,
      }),
    );
  };

  return (
    <EditMarkerModal
      open={editingCoordsIndex !== undefined}
      onClose={handleClose}
      onMarkerDelete={handleMarkerDelete}
      onMarkerMove={handleMarkerMove}
    />
  );
};

export default EditMarkerModalIndex;
