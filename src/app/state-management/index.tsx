import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
      
  },
});

export type RootState = ReturnType<typeof store.getState>;
