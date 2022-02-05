import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  addArea,
  editArea,
  endAddingEditingArea,
  findArea,
} from 'store/slices/areas';

import EditAreaModal from './editAreaModal';
import { EditValues } from './types';

const EditAreaModalIndex: React.FC = () => {
  const { addingArea, editingArea } = useSelector(state => ({
    addingArea: state.areas.addingArea,
    editingArea: findArea(state.areas.areas, state.areas.editingArea),
  }));
  const dispatch = useDispatch();

  const handleAreaEdit = (values: EditValues): void => {
    if (editingArea) {
      dispatch(editArea({ id: editingArea.id, ...values }));
      return;
    }
    dispatch(addArea(values));
  };

  const handleClose = (): void => {
    dispatch(endAddingEditingArea());
  };

  return (
    <EditAreaModal
      open={addingArea || editingArea !== undefined}
      area={editingArea}
      onAreaEdit={handleAreaEdit}
      onClose={handleClose}
    />
  );
};

export default EditAreaModalIndex;
