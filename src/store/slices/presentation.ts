import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { resetData } from '../actions';

import { PresentationState } from './types/presentation';

const initialState: PresentationState = {
  detailArea: undefined,
  detailDeposit: undefined,
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
    openDetailDeposit(state, action: PayloadAction<{ depositId: string }>) {
      state.detailDeposit = action.payload.depositId;
    },
    closeDetailDeposit(state) {
      state.detailDeposit = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(resetData, state => {
      state = initialState;
      return state;
    });
  },
});

export const {
  openDetailArea,
  closeDetailArea,
  openDetailDeposit,
  closeDetailDeposit,
} = presentationSlice.actions;

export default presentationSlice.reducer;
