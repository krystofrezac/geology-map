import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  deleteEditingDepositMarker,
  startMovingEditingDepositMarker,
  stopEditingDepositMarker,
} from 'store/slices/areas';

import EditMarkerModal from './editMarkerModal';

const EditMarkerModalIndex: React.FC = () => {
  const { editingDepositCoordsIndex } = useSelector(state => ({
    editingDepositCoordsIndex: state.areas.editingDepositCoordsIndex,
  }));
  const dispatch = useDispatch();

  const handleClose = (): void => {
    dispatch(stopEditingDepositMarker());
  };

  const handleMarkerDelete = (): void => {
    dispatch(deleteEditingDepositMarker());
  };

  const handleMarkerMove = (): void => {
    dispatch(startMovingEditingDepositMarker());
  };

  return (
    <EditMarkerModal
      open={editingDepositCoordsIndex !== undefined}
      onClose={handleClose}
      onMarkerDelete={handleMarkerDelete}
      onMarkerMove={handleMarkerMove}
    />
  );
};

export default EditMarkerModalIndex;
