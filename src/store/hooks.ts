import {
  TypedUseSelectorHook,
  useDispatch as useDispatchOrig,
  useSelector as useSelectorOrig,
} from 'react-redux';

import type { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useDispatchOrig<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrig;
