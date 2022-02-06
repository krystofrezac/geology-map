import React, { useState } from 'react';

import { useDispatch } from 'store/hooks';
import {
  deleteDeposit,
  findDeposit,
  startAddingDeposit,
  startEditingDeposit,
} from 'store/slices/areas';

import DeleteModal from './deleteModal';
import DepositList from './depositList';
import { DepositListIndexProps, DepositListIndexState } from './types';

const DepositListIndex: React.FC<DepositListIndexProps> = props => {
  const [state, setState] = useState<DepositListIndexState>({
    deletingDeposit: undefined,
  });
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

  return (
    <>
      <DepositList
        area={props.area}
        onDepositAdd={handleDepositAdd}
        onDepositEdit={handleDepositEdit}
        onDepositDelete={handleDepositDelete}
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
