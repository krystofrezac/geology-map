import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PresentationState } from './types/presentation';

const initialState: PresentationState = {
  detailArea: undefined,
};

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    openDetailArea(state, action: PayloadAction<{ areaId: string }>) {
      state.detailArea = action.payload.areaId;
    },
    closeDetailArea(state) {
      state.detailArea = undefined;
    },
  },
});

export const { openDetailArea, closeDetailArea } = presentationSlice.actions;

export default presentationSlice.reducer;
