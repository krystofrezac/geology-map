import React, { useState } from 'react';

import { MapEventListener } from 'react-mapycz';
import { useDispatch, useSelector } from 'store/hooks';
import {
  addArea,
  addAreaCoordinates,
  areaMoveCoordinates,
  areaStartMovingCoordinates,
  areaStopMovingCoordinates,
  deleteAreaCoords,
  findArea,
  hideAreaMarkers,
  showAreaMarkers,
  startEditingArea,
  startEditingMarker,
  stopEditingArea,
  stopEditingMarker,
} from 'store/slices/areas';

import BottomContainer from '../../components/bottomContainer';

import AddAreaModal from './addAreaModal';
import Areas from './areas';
import EditMarkerModal from './editMarkerModal';
import Map from './map';
import { AreaAddValues } from './types';

const AreasIndex: React.FC = () => {
  const [state, setState] = useState({
    addAreaModal: false,
  });

  const {
    areas,
    editingArea,
    markerShowArea,
    editingMarkerIndex,
    movingCoords,
  } = useSelector(s => {
    return {
      areas: s.areas.areas,
      editingArea: findArea(s.areas.areas, s.areas.editingArea),
      markerShowArea: findArea(s.areas.areas, s.areas.markerShowArea),
      editingMarkerIndex: s.areas.editingMarkerIndex,
      movingCoords: s.areas.movingCoords,
    };
  });
  const dispatch = useDispatch();

  const handleAddAreaOpen = (): void => {
    setState(prevState => ({ ...prevState, addAreaModal: true }));
  };

  const handleAddAreaClose = (): void => {
    setState(prevState => ({ ...prevState, addAreaModal: false }));
  };

  const handleAreaEditStart = (id: string): void => {
    dispatch(startEditingArea({ id }));
  };

  const handleAreaEditEnd = (): void => {
    dispatch(stopEditingArea());
  };

  const handleMarkersShow = (id: string): void => {
    dispatch(showAreaMarkers({ id }));
  };

  const handleMarkersHide = (): void => {
    dispatch(hideAreaMarkers());
  };

  const handleMarkerEditStop = (): void => {
    dispatch(stopEditingMarker());
  };

  const handleMarkerDelete = (): void => {
    if (!(markerShowArea && editingMarkerIndex !== undefined)) return;
    dispatch(
      deleteAreaCoords({
        id: markerShowArea.id,
        coordsIndex: editingMarkerIndex,
      }),
    );
    handleMarkerEditStop();
  };

  const handleMarkerMove = (): void => {
    if (!(markerShowArea && editingMarkerIndex !== undefined)) return;
    dispatch(
      areaStartMovingCoordinates({
        id: markerShowArea.id,
        coordsIndex: editingMarkerIndex,
      }),
    );
    handleMarkerEditStop();
  };

  const handleMarkerMoveCancel = (): void => {
    dispatch(areaStopMovingCoordinates());
  };

  const handleAreaAdd = (values: AreaAddValues): void => {
    dispatch(addArea(values));
  };

  const handleMapEvent: MapEventListener = (e, coords) => {
    // @ts-ignore
    if (e.type === 'marker-click') {
      dispatch(
        startEditingMarker({
          // eslint-disable-next-line no-underscore-dangle
          lng: e.target._coords.x,
          // eslint-disable-next-line no-underscore-dangle
          lat: e.target._coords.y,
        }),
      );
    }
    if (e.type === 'map-click' && coords) {
      dispatch(
        areaMoveCoordinates({
          coords: { lng: coords.x, lat: coords.y },
        }),
      );
      dispatch(
        addAreaCoordinates({ coords: { lng: coords.x, lat: coords.y } }),
      );
    }
  };

  return (
    <>
      <Map
        areas={areas}
        editingArea={editingArea}
        markerShowArea={markerShowArea}
        onMapEvent={handleMapEvent}
      />
      <AddAreaModal
        open={state.addAreaModal}
        onClose={handleAddAreaClose}
        onAreaAdd={handleAreaAdd}
      />
      <EditMarkerModal
        open={editingMarkerIndex !== undefined}
        onClose={handleMarkerEditStop}
        onMarkerDelete={handleMarkerDelete}
        onMarkerMove={handleMarkerMove}
      />
      <Areas
        areas={areas}
        editingArea={editingArea}
        markerShowArea={markerShowArea}
        onAddAreaOpen={handleAddAreaOpen}
        onAddAreaClose={handleAddAreaClose}
        onAreaEditStart={handleAreaEditStart}
        onAreaEditEnd={handleAreaEditEnd}
        onMarkersShow={handleMarkersShow}
        onMarkersHide={handleMarkersHide}
      />
      {movingCoords && (
        <BottomContainer>
          <div className="card bg-white shadow-2xl p-4 mb-4 flex flex-row items-center">
            <span className="text-lg pr-2">
              Přemisťování bodu, klikněte na novou pozici na mapě.
            </span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleMarkerMoveCancel}
            >
              Zrušit
            </button>
          </div>
        </BottomContainer>
      )}
    </>
  );
};
export default AreasIndex;
