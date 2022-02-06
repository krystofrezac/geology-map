import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  addArea,
  editArea,
  endAddingEditingArea,
  findArea,
  findAreaParent,
} from 'store/slices/areas';

import EditAreaModal from './editAreaModal';
import { EditValues } from './types';

const EditAreaModalIndex: React.FC = () => {
  const { addingArea, editingArea, areas } = useSelector(state => ({
    addingArea: state.areas.addingArea,
    editingArea: findArea(state.areas.areas, state.areas.editingArea),
    areas: state.areas.areas,
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
  const editingAreaParent = findAreaParent(areas, editingArea?.id);
  return (
    <EditAreaModal
      open={addingArea || editingArea !== undefined}
      area={editingArea}
      extend={editingAreaParent?.id}
      areas={areas}
      onAreaEdit={handleAreaEdit}
      onClose={handleClose}
    />
  );
};

export default EditAreaModalIndex;
