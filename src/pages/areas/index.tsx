import React, { useState } from 'react';

import { MapEventListener } from 'react-mapycz';
import { useDispatch, useSelector } from 'store/hooks';
import {
  addAreaCoordinates,
  endEditingArea,
  startEditingArea,
} from 'store/slices/areas';

import AddAreaModal from './addAreaModal';
import Areas from './areas';
import Map from './map';

const AreasIndex: React.FC = () => {
  const [state, setState] = useState({
    addAreaModal: false,
  });

  const { areas, editingAreaId } = useSelector(s => ({
    areas: s.areas.areas,
    editingAreaId: s.areas.editingArea,
  }));
  const dispatch = useDispatch();

  const handleAddAreaOpen = (): void => {
    setState(prevState => ({ ...prevState, addAreaModal: true }));
  };

  const handleAddAreaClose = (): void => {
    setState(prevState => ({ ...prevState, addAreaModal: false }));
  };

  const handleAreaEditStart = (id: string): void => {
    dispatch(startEditingArea({ id }));
    setState(prevState => ({ ...prevState, editingArea: id }));
  };

  const handleAreaEditEnd = (): void => {
    dispatch(endEditingArea());
  };

  const handleMapEvent: MapEventListener = (e, coords) => {
    if (e.type === 'map-click' && coords)
      dispatch(
        addAreaCoordinates({ coords: { lng: coords.x, lat: coords.y } }),
      );
  };

  const editingArea = areas.find(a => a.id === editingAreaId);
  return (
    <>
      <Map
        areas={areas}
        editingArea={editingArea}
        onMapEvent={handleMapEvent}
      />
      <AddAreaModal open={state.addAreaModal} onClose={handleAddAreaClose} />
      <Areas
        areas={areas}
        editingArea={editingArea}
        onAddAreaOpen={handleAddAreaOpen}
        onAddAreaClose={handleAddAreaClose}
        onAreaEditStart={handleAreaEditStart}
        onAreaEditEnd={handleAreaEditEnd}
      />
    </>
  );
};
export default AreasIndex;
