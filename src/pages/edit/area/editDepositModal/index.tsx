import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  addDeposit,
  editDeposit,
  findDeposit,
  stopAddingEditingDeposit,
} from 'store/slices/areas';

import EditDepositModal from './editDepositModal';
import { EditDepositModalIndexProps, EditValues } from './types';

const EditDepositModalIndex: React.FC<EditDepositModalIndexProps> = props => {
  const { addingDeposit, editingDeposit } = useSelector(state => ({
    addingDeposit: state.areas.addingDeposit,
    editingDeposit: findDeposit(props.area, state.areas.editingDeposit),
  }));
  const dispatch = useDispatch();

  const handleClose = (): void => {
    dispatch(stopAddingEditingDeposit());
  };

  const handleSubmit = (values: EditValues): void => {
    if (editingDeposit) {
      dispatch(
        editDeposit({
          areaId: props.area.id,
          id: editingDeposit.id,
          ...values,
        }),
      );
      return;
    }
    dispatch(addDeposit({ ...values, areaId: props.area.id }));
  };

  return (
    <EditDepositModal
      open={addingDeposit || editingDeposit !== undefined}
      deposit={editingDeposit}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default EditDepositModalIndex;
