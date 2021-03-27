import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import throttleReducer from './slices/ThrottleSlice';
import zoomReducer from '../state-management/slices/ZoomSlice';

const customizedPayloadAction = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    zoom: zoomReducer,
    throttle: throttleReducer,
  },
  middleware: customizedPayloadAction,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
