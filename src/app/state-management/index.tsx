import {configureStore /*, getDefaultMiddleware*/} from '@reduxjs/toolkit';
import throttleReducer from './slices/ThrottleSlice';
import zoomReducer from '../state-management/slices/ZoomSlice';
import snapshotReducer from '../state-management/slices/SnapshotSlice';
import atomNetworkReducer from '../state-management/slices/AtomNetworkSlice';
import filterReducer from '../state-management/slices/FilterSlice';
import selectedReducer from './slices/SelectedSlice';
import atomsAndSelectorsReducer from './slices/AtomsAndSelectorsSlice';

import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import {combineReducers} from 'redux';

// const customizedPayloadAction = getDefaultMiddleware({
//   serializableCheck: false,
// });

const reducers = combineReducers({
  zoom: zoomReducer,
  throttle: throttleReducer,
  snapshot: snapshotReducer,
  atomNetwork: atomNetworkReducer,
  filter: filterReducer,
  selected: selectedReducer,
  atomsAndSelectors: atomsAndSelectorsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// exporting root reducer for use in testing
export const rootReducer = persistedReducer;
