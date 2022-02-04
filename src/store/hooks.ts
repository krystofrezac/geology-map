import {
  TypedUseSelectorHook,
  useDispatch as useDispatchOrig,
  useSelector as useSelectorOrig,
} from 'react-redux';

import type { AppDispatch, RootState } from './store';

export const useDispatch = (): AppDispatch => useDispatchOrig();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrig;
