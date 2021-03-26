import {configureStore} from '@reduxjs/toolkit';
import throttleReducer from './slices/ThrottleSlice';

export const store = configureStore({
  reducer: {
    throttle: throttleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
