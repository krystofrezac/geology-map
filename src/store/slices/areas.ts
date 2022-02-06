import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { Area, AreasState, Coords, Deposit, RootArea } from './types/areas';

const initialState: AreasState = {
  areas: [],
  // id of area where markers are added
  editingAreaCoords: undefined, // id of area where all markers are shown on map
  markerShowArea: undefined,
  // id of coords in `markerShowArea` that is being edited (modal is open)
  editingCoordsIndex: undefined,
  // coords that are changing position
  movingCoords: undefined,
  // is open area add modal
  addingArea: false,
  // id of area that is being edited
  editingArea: undefined,

  // is open add deposit modal
  addingDeposit: false,
  // id of deposit that is being edited
  editingDeposit: undefined,
};

export const findArea = (areas: RootArea[], id?: string): Area | undefined => {
  if (!id) return undefined;
  // eslint-disable-next-line no-restricted-syntax
  for (const a of areas) {
    if (a.id === id) return a;
    const extension = a.extensions.find(e => e.id === id);
    if (extension) return extension;
  }
  return undefined;
};

export const findRootArea = (
  areas: RootArea[],
  id?: string,
): RootArea | undefined => {
  return areas.find(a => a.id === id);
};

export const findAreaParent = (
  areas: RootArea[],
  id?: string,
): RootArea | undefined => {
  if (!id) return undefined;
  // eslint-disable-next-line no-restricted-syntax
  for (const a of areas) {
    const extension = a.extensions.find(e => e.id === id);
    if (extension) return a;
  }
  return undefined;
};

export const findDeposit = (
  area: RootArea,
  depositId?: string,
): Deposit | undefined => {
  return area.deposits.find(d => d.id === depositId);
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
        state.areas.push({ ...areaData, extensions: [], deposits: [] });
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
        state.areas.push({ ...area, extensions: [], deposits: [] });
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
    startAddingDeposit(state) {
      state.addingDeposit = true;
    },
    stopAddingEditingDeposit(state) {
      state.addingDeposit = false;
      state.editingDeposit = undefined;
    },
    startEditingDeposit(state, action: PayloadAction<{ id: string }>) {
      state.editingDeposit = action.payload.id;
    },
    addDeposit(
      state,
      action: PayloadAction<{ areaId: string; name: string; color: string }>,
    ) {
      const area = findRootArea(state.areas, action.payload.areaId);
      if (!area) return;
      const { name, color } = action.payload;
      area.deposits.push({ id: nanoid(), name, color, coords: [] });
      state.addingDeposit = false;
    },
    editDeposit(
      state,
      action: PayloadAction<{
        areaId: string;
        id: string;
        name: string;
        color: string;
      }>,
    ) {
      const area = findRootArea(state.areas, action.payload.areaId);
      if (!area) return;

      const deposit = findDeposit(area, action.payload.id);
      if (!deposit) return;

      const { name, color } = action.payload;
      deposit.name = name;
      deposit.color = color;

      state.editingDeposit = undefined;
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
  startAddingDeposit,
  stopAddingEditingDeposit,
  addDeposit,
  startEditingDeposit,
  editDeposit,
} = areasSlice.actions;

export default areasSlice.reducer;
