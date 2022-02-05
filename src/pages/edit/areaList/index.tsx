import React from 'react';

import { useDispatch, useSelector } from 'store/hooks';
import {
  findArea,
  hideAreaMarkers,
  showAreaMarkers,
  startAddingArea,
  startEditingArea,
  startEditingAreaCoords,
  stopEditingAreaCoords,
} from 'store/slices/areas';

import AreaList from './areaList';

const AreaListIndex: React.FC = () => {
  const { areas, editingAreaCoords, markerShowArea } = useSelector(state => ({
    areas: state.areas.areas,
    editingAreaCoords: findArea(
      state.areas.areas,
      state.areas.editingAreaCoords,
    ),
    markerShowArea: findArea(state.areas.areas, state.areas.markerShowArea),
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

  return (
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
    />
  );
};

export default AreaListIndex;
