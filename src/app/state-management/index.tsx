import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import zoomReducer from '../state-management/slices/ZoomSlice';


const customizedPayloadAction = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
  reducer: {
      zoom: zoomReducer,
  },
  middleware: customizedPayloadAction,
});

export type RootState = ReturnType<typeof store.getState>;
