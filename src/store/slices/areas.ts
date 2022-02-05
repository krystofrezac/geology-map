import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { Area, AreasState, Coords } from './types/areas';

const initialState: AreasState = {
  areas: [],
  editingArea: undefined,
  markerShowArea: undefined,
  editingMarkerIndex: undefined,
  movingCoords: undefined,
};

export const findArea = (
  areas: Area[],
  id: string | undefined,
): Area | undefined => {
  if (!id) return undefined;
  return areas.find(a => a.id === id);
};

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    addArea(state, action: PayloadAction<{ name: string }>) {
      state.areas.push({ id: nanoid(), name: action.payload.name, coords: [] });
    },
    startEditingArea(state, action: PayloadAction<{ id: string }>) {
      state.editingArea = action.payload.id;
      state.markerShowArea = undefined;
    },
    stopEditingArea(state) {
      state.editingArea = undefined;
    },
    addAreaCoordinates(state, action: PayloadAction<{ coords: Coords }>) {
      const area = findArea(state.areas, state.editingArea);
      area?.coords.push(action.payload.coords);
    },
    showAreaMarkers(state, action: PayloadAction<{ id: string }>) {
      state.markerShowArea = action.payload.id;
      state.editingArea = undefined;
    },

    hideAreaMarkers(state) {
      state.markerShowArea = undefined;
    },
    deleteAreaCoords(
      state,
      action: PayloadAction<{ id: string; coordsIndex: number }>,
    ) {
      findArea(state.areas, action.payload.id)?.coords.splice(
        action.payload.coordsIndex,
        1,
      );
    },
    startEditingMarker(
      state,
      action: PayloadAction<{ lat: number; lng: number }>,
    ) {
      const area = findArea(state.areas, state.markerShowArea);
      const areaCoordsIndex = area?.coords.findIndex(
        // eslint-disable-next-line no-underscore-dangle
        c => c.lng === action.payload.lng && c.lat === action.payload.lat,
      );
      if (areaCoordsIndex === undefined) return;
      state.editingMarkerIndex = areaCoordsIndex;
    },
    stopEditingMarker(state) {
      state.editingMarkerIndex = undefined;
    },
    areaStartMovingCoordinates(
      state,
      action: PayloadAction<{ id: string; coordsIndex: number }>,
    ) {
      const { id, coordsIndex } = action.payload;
      state.movingCoords = { areaId: id, coordsIndex };
    },
    areaStopMovingCoordinates(state) {
      state.movingCoords = undefined;
    },
    areaMoveCoordinates(
      state,
      action: PayloadAction<{
        coords: Coords;
      }>,
    ) {
      if (!state.movingCoords) return;

      const area = findArea(state.areas, state.movingCoords.areaId);
      if (!area) return;
      area.coords[state.movingCoords.coordsIndex] = action.payload.coords;
      state.movingCoords = undefined;
    },
  },
});

export const {
  addArea,
  addAreaCoordinates,
  startEditingArea,
  stopEditingArea,
  showAreaMarkers,
  hideAreaMarkers,
  deleteAreaCoords,
  startEditingMarker,
  stopEditingMarker,
  areaStartMovingCoordinates,
  areaStopMovingCoordinates,
  areaMoveCoordinates,
} = areasSlice.actions;

export default areasSlice.reducer;
