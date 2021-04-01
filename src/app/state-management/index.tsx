import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import throttleReducer from './slices/ThrottleSlice';
import zoomReducer from '../state-management/slices/ZoomSlice';
import filterReducer from '../state-management/slices/FilterSlice';

const customizedPayloadAction = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    zoom: zoomReducer,
    throttle: throttleReducer,
    filter: filterReducer,
  },
  middleware: customizedPayloadAction,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
