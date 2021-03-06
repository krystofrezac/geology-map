import React, { useState } from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  deleteDeposit,
  findDeposit,
  hideDepositMarkers,
  moveDepositDown,
  moveDepositUp,
  showDepositMarkers,
  startAddingDeposit,
  startEditingDeposit,
  startEditingDepositCoords,
  stopEditingDepositCoords,
} from 'store/slices/areas';

import DeleteModal from './deleteModal';
import DepositList from './depositList';
import { DepositListIndexProps, DepositListIndexState } from './types';

const DepositListIndex: React.FC<DepositListIndexProps> = props => {
  const [state, setState] = useState<DepositListIndexState>({
    deletingDeposit: undefined,
  });
  const { editingDepositCoords, markerShowDeposit } = useSelector(s => ({
    editingDepositCoords: s.areas.editingDepositCoords,
    markerShowDeposit: s.areas.markerShowDeposit,
  }));
  const dispatch = useDispatch();

  const handleDepositAdd = (): void => {
    dispatch(startAddingDeposit());
  };

  const handleDepositEdit = (id: string): void => {
    dispatch(startEditingDeposit({ id }));
  };

  const handleDepositDelete = (id: string): void => {
    setState(prevState => ({
      ...prevState,
      deletingDeposit: findDeposit(props.area, id),
    }));
  };

  const handleDepositDeleteCancel = (): void => {
    setState(prevState => ({ ...prevState, deletingDeposit: undefined }));
  };
  const handleDepositDeleteSubmit = (): void => {
    if (!state.deletingDeposit) return;
    dispatch(
      deleteDeposit({ areaId: props.area.id, id: state.deletingDeposit?.id }),
    );
    handleDepositDeleteCancel();
  };

  const handleDepositCoordsEdit = (id: string): void => {
    if (id === editingDepositCoords?.depositId) {
      dispatch(stopEditingDepositCoords());
      return;
    }
    dispatch(
      startEditingDepositCoords({ areaId: props.area.id, depositId: id }),
    );
  };

  const handleDepositMarkersShow = (id: string): void => {
    if (id === markerShowDeposit?.depositId) {
      dispatch(hideDepositMarkers());
      return;
    }
    dispatch(showDepositMarkers({ areaId: props.area.id, depositId: id }));
  };

  const handleDepositMoveUp = (id: string): void => {
    dispatch(moveDepositUp({ areaId: props.area.id, depositId: id }));
  };
  const handleDepositMoveDown = (id: string): void => {
    dispatch(moveDepositDown({ areaId: props.area.id, depositId: id }));
  };

  return (
    <>
      <DepositList
        area={props.area}
        editingDepositCoords={editingDepositCoords?.depositId}
        markersShowDeposit={markerShowDeposit?.depositId}
        onDepositAdd={handleDepositAdd}
        onDepositEdit={handleDepositEdit}
        onDepositDelete={handleDepositDelete}
        onDepositCoordsEdit={handleDepositCoordsEdit}
        onDepositMarkersShow={handleDepositMarkersShow}
        onDepositMoveUp={handleDepositMoveUp}
        onDepositMoveDown={handleDepositMoveDown}
      />
      <DeleteModal
        deposit={state.deletingDeposit}
        onCancel={handleDepositDeleteCancel}
        onDelete={handleDepositDeleteSubmit}
      />
    </>
  );
};

export default DepositListIndex;
