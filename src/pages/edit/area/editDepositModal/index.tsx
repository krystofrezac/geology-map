import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import { addDeposit, stopAddingDeposit } from 'store/slices/areas';

import EditDepositModal from './editDepositModal';
import { EditDepositModalIndexProps, EditValues } from './types';

const EditDepositModalIndex: React.FC<EditDepositModalIndexProps> = props => {
  const { addingDeposit } = useSelector(state => ({
    addingDeposit: state.areas.addingDeposit,
  }));
  const dispatch = useDispatch();

  const handleClose = (): void => {
    dispatch(stopAddingDeposit());
  };

  const handleAdd = (values: EditValues): void => {
    dispatch(addDeposit({ ...values, areaId: props.area.id }));
  };

  return (
    <EditDepositModal
      open={addingDeposit}
      onClose={handleClose}
      onAdd={handleAdd}
    />
  );
};

export default EditDepositModalIndex;
