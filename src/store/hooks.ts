import {
  TypedUseSelectorHook,
  useDispatch as useDispatchOrig,
  useSelector as useSelectorOrig,
} from 'react-redux';

import type { AppDispatch, RootState } from './store';

const dispatch = useDispatchOrig<AppDispatch>();

export const useDispatch = (): typeof dispatch => dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrig;
