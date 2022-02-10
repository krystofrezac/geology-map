import React, { useState } from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  deleteArea,
  findArea,
  hideAreaMarkers,
  moveAreaDown,
  moveAreaUp,
  showAreaMarkers,
  startAddingArea,
  startEditingArea,
  startEditingAreaCoords,
  stopEditingAreaCoords,
} from 'store/slices/areas';

import AreaList from './areaList';
import DeleteModal from './deleteModal';
import { AreaListIndexState } from './types';

const AreaListIndex: React.FC = () => {
  const [state, setState] = useState<AreaListIndexState>({
    deleteArea: undefined,
  });

  const { areas, editingAreaCoords, markerShowArea } = useSelector(s => ({
    areas: s.areas.areas,
    editingAreaCoords: findArea(s.areas.areas, s.areas.editingAreaCoords),
    markerShowArea: findArea(s.areas.areas, s.areas.markerShowArea),
  }));
  const dispatch = useDispatch();

  const handleAddAreaOpen = (): void => {
    dispatch(startAddingArea());
  };

  const handleAreaEditCoordsStart = (areaId: string): void => {
    dispatch(startEditingAreaCoords({ areaId }));
  };
  const handleAreaEditCoordsEnd = (): void => {
    dispatch(stopEditingAreaCoords());
  };

  const handleMarkersShow = (areaId: string): void => {
    dispatch(showAreaMarkers({ areaId }));
  };
  const handleMarkersHide = (): void => {
    dispatch(hideAreaMarkers());
  };

  const handleAreaEdit = (areaId: string): void => {
    dispatch(startEditingArea({ areaId }));
  };
  const handleOpenDeleteModal = (areaId: string): void => {
    const area = findArea(areas, areaId);
    if (!area) return;

    setState(prevState => ({ ...prevState, deleteArea: area }));
  };
  const handleAreaDelete = (): void => {
    if (!state.deleteArea) return;
    dispatch(deleteArea({ id: state.deleteArea?.id }));
    setState(prevState => ({ ...prevState, deleteArea: undefined }));
  };

  const handleDeleteModalClose = (): void => {
    setState(prevState => ({ ...prevState, deleteArea: undefined }));
  };

  const handleAreaMoveUp = (id: string): void => {
    dispatch(moveAreaUp({ areaId: id }));
  };
  const handleAreaMoveDown = (id: string): void => {
    dispatch(moveAreaDown({ areaId: id }));
  };

  return (
    <>
      <AreaList
        areas={areas}
        editingAreaCoords={editingAreaCoords}
        markerShowArea={markerShowArea}
        onAddAreaOpen={handleAddAreaOpen}
        onAreaEditCoordsStart={handleAreaEditCoordsStart}
        onAreaEditCoordsEnd={handleAreaEditCoordsEnd}
        onMarkersShow={handleMarkersShow}
        onMarkersHide={handleMarkersHide}
        onAreaEdit={handleAreaEdit}
        onAreaDelete={handleOpenDeleteModal}
        onAreaMoveUp={handleAreaMoveUp}
        onAreaMoveDown={handleAreaMoveDown}
      />
      <DeleteModal
        area={state.deleteArea}
        onDelete={handleAreaDelete}
        onCancel={handleDeleteModalClose}
      />
    </>
  );
};

export default AreaListIndex;
