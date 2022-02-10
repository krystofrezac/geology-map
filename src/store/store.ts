import { combineReducers, createStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import areasReducer from './slices/areas';
import presentationReducer from './slices/presentation';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    areas: areasReducer,
    presentation: presentationReducer,
  }),
);

const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
