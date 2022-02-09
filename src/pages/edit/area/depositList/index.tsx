import React, { useState } from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  deleteDeposit,
  findDeposit,
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
  const { editingDepositCoords } = useSelector(s => ({
    editingDepositCoords: s.areas.editingDepositCoords,
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

  return (
    <>
      <DepositList
        area={props.area}
        editingDepositCoords={editingDepositCoords?.depositId}
        onDepositAdd={handleDepositAdd}
        onDepositEdit={handleDepositEdit}
        onDepositDelete={handleDepositDelete}
        onDepositCoordsEdit={handleDepositCoordsEdit}
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
