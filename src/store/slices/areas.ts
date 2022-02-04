import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { AreasState, Coords } from './types/areas';

const initialState: AreasState = {
  areas: [],
  editingArea: undefined,
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
    },
    endEditingArea(state) {
      state.editingArea = undefined;
    },
    addAreaCoordinates(state, action: PayloadAction<{ coords: Coords }>) {
      const area = state.areas.find(a => a.id === state.editingArea);
      if (!area) return;
      area.coords.push(action.payload.coords);
    },
  },
});

export const { addArea, addAreaCoordinates, startEditingArea, endEditingArea } =
  areasSlice.actions;

export default areasSlice.reducer;
