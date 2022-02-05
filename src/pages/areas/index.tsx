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
  editArea,
  findArea,
  hideAreaMarkers,
  showAreaMarkers,
  startEditingAreaCoords,
  startEditingMarker,
  stopEditingAreaCoords,
  stopEditingMarker,
} from 'store/slices/areas';

import BottomContainer from '../../components/bottomContainer';

import AddAreaModal from './addAreaModal';
import Areas from './areas';
import EditMarkerModal from './editMarkerModal';
import Map from './map';
import { AreaAddValues, AreasIndexState } from './types';

const AreasIndex: React.FC = () => {
  const [state, setState] = useState<AreasIndexState>({
    addArea: false,
    editingArea: undefined,
  });

  const {
    areas,
    editingAreaCoords,
    markerShowArea,
    editingMarkerIndex,
    movingCoords,
  } = useSelector(s => {
    return {
      areas: s.areas.areas,
      editingAreaCoords: findArea(s.areas.areas, s.areas.editingAreaCoords),
      markerShowArea: findArea(s.areas.areas, s.areas.markerShowArea),
      editingMarkerIndex: s.areas.editingMarkerIndex,
      movingCoords: s.areas.movingCoords,
    };
  });
  const dispatch = useDispatch();

  const handleAddAreaOpen = (): void => {
    setState(prevState => ({ ...prevState, addArea: true }));
  };

  const handleAddAreaClose = (): void => {
    setState(prevState => ({
      ...prevState,
      addArea: false,
      editingArea: undefined,
    }));
  };

  const handleAreaEditCoordsStart = (id: string): void => {
    dispatch(startEditingAreaCoords({ id }));
  };

  const handleAreaEditCoordsEnd = (): void => {
    dispatch(stopEditingAreaCoords());
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

  const handleAreaEdit = (id: string): void => {
    const area = findArea(areas, id);
    if (!area) return;
    setState(prevState => ({ ...prevState, editingArea: area }));
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
    if (state.editingArea) {
      dispatch(editArea({ id: state.editingArea.id, ...values }));
      return;
    }
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
        editingAreaCoords={editingAreaCoords}
        markerShowArea={markerShowArea}
        onMapEvent={handleMapEvent}
      />
      <AddAreaModal
        open={state.addArea || state.editingArea !== undefined}
        area={state.editingArea}
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
        editingAreaCoords={editingAreaCoords}
        markerShowArea={markerShowArea}
        onAddAreaOpen={handleAddAreaOpen}
        onAddAreaClose={handleAddAreaClose}
        onAreaEditCoordsStart={handleAreaEditCoordsStart}
        onAreaEditCoordsEnd={handleAreaEditCoordsEnd}
        onMarkersShow={handleMarkersShow}
        onMarkersHide={handleMarkersHide}
        onAreaEdit={handleAreaEdit}
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
