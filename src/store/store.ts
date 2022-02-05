import { combineReducers, createStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import areasReducer from './slices/areas';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    areas: areasReducer,
  }),
);

const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
