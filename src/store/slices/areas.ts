import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { Area, AreasState, AreaWithExtensions, Coords } from './types/areas';

const initialState: AreasState = {
  areas: [],
  // id of area where markers are added
  editingAreaCoords: undefined,
  // id of area where all markers are shown on map
  markerShowArea: undefined,
  // id of coords in `markerShowArea` that is being edited (modal is open)
  editingCoordsIndex: undefined,
  // coords that are changing position
  movingCoords: undefined,
  // is open add modal
  addingArea: false,
  // is open edit modal
  editingArea: undefined,
};

export const findArea = (
  areas: AreaWithExtensions[],
  id?: string,
): Area | undefined => {
  if (!id) return undefined;
  // eslint-disable-next-line no-restricted-syntax
  for (const a of areas) {
    if (a.id === id) return a;
    const extension = a.extensions.find(e => e.id === id);
    if (extension) return extension;
  }
  return undefined;
};

const findRootArea = (
  areas: AreaWithExtensions[],
  id?: string,
): AreaWithExtensions | undefined => {
  return areas.find(a => a.id === id);
};

export const findAreaParent = (
  areas: AreaWithExtensions[],
  id?: string,
): AreaWithExtensions | undefined => {
  if (!id) return undefined;
  // eslint-disable-next-line no-restricted-syntax
  for (const a of areas) {
    const extension = a.extensions.find(e => e.id === id);
    if (extension) return a;
  }
  return undefined;
};

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    addArea(
      state,
      action: PayloadAction<{ name: string; color: string; extend?: string }>,
    ) {
      const areaData = {
        id: nanoid(),
        name: action.payload.name,
        color: action.payload.color,
        coords: [],
      };

      if (!action.payload.extend) {
        state.areas.push({ ...areaData, extensions: [] });
        return;
      }

      const parentArea = findRootArea(state.areas, action.payload.extend);
      if (!parentArea) return;
      parentArea.extensions.push(areaData);
    },
    editArea(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        color: string;
        extend?: string;
      }>,
    ) {
      const area = findArea(state.areas, action.payload.id);
      if (!area) return;

      const { name, color } = action.payload;
      area.name = name;
      area.color = color;

      let areaParent = findAreaParent(state.areas, area.id);
      // If area is moved from children to root
      if (areaParent && action.payload.extend === undefined) {
        areaParent.extensions = areaParent.extensions.filter(
          e => e.id !== area.id,
        );
        state.areas.push({ ...area, extensions: [] });
        return;
      }

      // If area is move from root to children
      if (!areaParent && action.payload.extend !== undefined) {
        state.areas = state.areas.filter(a => a.id !== area.id);
        areaParent = findRootArea(state.areas, action.payload.extend);
        areaParent?.extensions.push(area);
      }
    },
    deleteArea(state, action: PayloadAction<{ id: string }>) {
      const areaIndex = state.areas.findIndex(
        area => area.id === action.payload.id,
      );
      state.areas.splice(areaIndex, 1);
    },
    startEditingAreaCoords(state, action: PayloadAction<{ areaId: string }>) {
      state.editingAreaCoords = action.payload.areaId;
      state.markerShowArea = undefined;
      state.movingCoords = undefined;
    },
    stopEditingAreaCoords(state) {
      state.editingAreaCoords = undefined;
    },
    addAreaCoordinates(state, action: PayloadAction<{ coords: Coords }>) {
      const area = findArea(state.areas, state.editingAreaCoords);
      area?.coords.push(action.payload.coords);
    },
    showAreaMarkers(state, action: PayloadAction<{ areaId: string }>) {
      state.markerShowArea = action.payload.areaId;
      state.editingAreaCoords = undefined;
    },

    hideAreaMarkers(state) {
      state.markerShowArea = undefined;
      state.movingCoords = undefined;
    },
    deleteAreaCoords(
      state,
      action: PayloadAction<{ areaId: string; coordsIndex: number }>,
    ) {
      findArea(state.areas, action.payload.areaId)?.coords.splice(
        action.payload.coordsIndex,
        1,
      );
      state.editingCoordsIndex = undefined;
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
      state.editingCoordsIndex = areaCoordsIndex;
    },
    stopEditingMarker(state) {
      state.editingCoordsIndex = undefined;
    },
    areaStartMovingCoordinates(
      state,
      action: PayloadAction<{ areaId: string; coordsIndex: number }>,
    ) {
      const { areaId, coordsIndex } = action.payload;
      state.movingCoords = { areaId, coordsIndex };
      state.editingCoordsIndex = undefined;
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
    startAddingArea(state) {
      state.addingArea = true;
    },
    startEditingArea(state, action: PayloadAction<{ areaId: string }>) {
      state.editingArea = action.payload.areaId;
    },
    endAddingEditingArea(state) {
      state.editingArea = undefined;
      state.addingArea = false;
    },
  },
});

export const {
  addArea,
  editArea,
  deleteArea,
  addAreaCoordinates,
  startEditingAreaCoords,
  stopEditingAreaCoords,
  showAreaMarkers,
  hideAreaMarkers,
  deleteAreaCoords,
  startEditingMarker,
  stopEditingMarker,
  areaStartMovingCoordinates,
  areaStopMovingCoordinates,
  areaMoveCoordinates,
  startAddingArea,
  startEditingArea,
  endAddingEditingArea,
} = areasSlice.actions;

export default areasSlice.reducer;
