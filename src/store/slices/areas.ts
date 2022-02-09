import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { Area, AreasState, Coords, Deposit, RootArea } from './types/areas';

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
  // is open area add modal
  addingArea: false,
  // id of area that is being edited
  editingArea: undefined,

  // is open add deposit modal
  addingDeposit: false,
  // id of deposit that is being edited
  editingDeposit: undefined,
  // deposit where markers are added
  editingDepositCoords: undefined,
  // deposit where all marker are displayed on map
  markerShowDeposit: undefined,
  // id of deposit coords that is being edited
  editingDepositCoordsIndex: undefined,

  movingEditingDepositCoordsIndex: undefined,
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
    deleteDeposit(
      state,
      action: PayloadAction<{ areaId: string; id: string }>,
    ) {
      const { areaId, id } = action.payload;
      const area = findRootArea(state.areas, areaId);
      if (!area) return;

      area.deposits = area.deposits.filter(d => d.id !== id);
    },
    startEditingDepositCoords(
      state,
      action: PayloadAction<{ areaId: string; depositId: string }>,
    ) {
      const { areaId, depositId } = action.payload;
      state.editingDepositCoords = { areaId, depositId };
      state.markerShowDeposit = undefined;
    },
    stopEditingDepositCoords(state) {
      state.editingDepositCoords = undefined;
    },
    addDepositCoords(state, action: PayloadAction<{ coords: Coords }>) {
      const area = findRootArea(
        state.areas,
        state.editingDepositCoords?.areaId,
      );
      if (!area) return;
      const deposit = findDeposit(area, state.editingDepositCoords?.depositId);
      deposit?.coords.push(action.payload.coords);
    },
    showDepositMarkers(
      state,
      action: PayloadAction<{ areaId: string; depositId: string }>,
    ) {
      const { areaId, depositId } = action.payload;
      state.markerShowDeposit = { areaId, depositId };
      state.editingDepositCoords = undefined;
    },
    hideDepositMarkers(state) {
      state.markerShowDeposit = undefined;
      state.movingEditingDepositCoordsIndex = undefined;
      state.editingDepositCoordsIndex = undefined;
    },
    startEditingDepositMarker(
      state,
      action: PayloadAction<{ coords: Coords }>,
    ) {
      const area = findRootArea(state.areas, state.markerShowDeposit?.areaId);
      if (!area) return;
      const deposit = findDeposit(area, state.markerShowDeposit?.depositId);
      const { lat, lng } = action.payload.coords;
      const markerIndex = deposit?.coords.findIndex(
        c => c.lat === lat && c.lng === lng,
      );
      if (markerIndex === undefined || markerIndex < 0) return;
      state.editingDepositCoordsIndex = markerIndex;
    },
    stopEditingDepositMarker(state) {
      state.editingDepositCoordsIndex = undefined;
    },
    deleteEditingDepositMarker(state) {
      if (state.editingDepositCoordsIndex === undefined) return;

      const area = findRootArea(state.areas, state.markerShowDeposit?.areaId);
      if (!area) return;
      const deposit = findDeposit(area, state.markerShowDeposit?.depositId);
      if (!deposit) return;

      deposit.coords.splice(state.editingDepositCoordsIndex, 1);
      state.editingDepositCoordsIndex = undefined;
    },
    startMovingEditingDepositMarker(state) {
      state.movingEditingDepositCoordsIndex = state.editingDepositCoordsIndex;
      state.editingDepositCoordsIndex = undefined;
    },
    stopMovingEditingDepositMarker(state) {
      state.movingEditingDepositCoordsIndex = undefined;
    },
    moveEditingDepositMarker(state, action: PayloadAction<{ coords: Coords }>) {
      if (state.movingEditingDepositCoordsIndex === undefined) return;

      const area = findRootArea(state.areas, state.markerShowDeposit?.areaId);
      if (!area) return;
      const deposit = findDeposit(area, state.markerShowDeposit?.depositId);
      if (!deposit) return;

      const coords = deposit.coords[state.movingEditingDepositCoordsIndex];
      coords.lng = action.payload.coords.lng;
      coords.lat = action.payload.coords.lat;

      state.movingEditingDepositCoordsIndex = undefined;
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
  deleteDeposit,
  startEditingDepositCoords,
  stopEditingDepositCoords,
  addDepositCoords,
  showDepositMarkers,
  hideDepositMarkers,
  startEditingDepositMarker,
  stopEditingDepositMarker,
  deleteEditingDepositMarker,
  startMovingEditingDepositMarker,
  stopMovingEditingDepositMarker,
  moveEditingDepositMarker,
} = areasSlice.actions;

export default areasSlice.reducer;
