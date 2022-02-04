import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import areasReducer from './slices/areas';

export const store = configureStore({
  reducer: {
    areas: areasReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
