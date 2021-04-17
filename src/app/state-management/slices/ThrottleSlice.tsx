import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  throttleValue: '70',
};

export const throttleSlice = createSlice({
  name: 'throttle',
  initialState,
  reducers: {
    newThrottle: (state, action: PayloadAction<string>) => {
      state.throttleValue = action.payload;
    },
    resetThrottle: state => {
      state.throttleValue = '70';
    },
  },
});

export const {newThrottle, resetThrottle} = throttleSlice.actions;

export default throttleSlice.reducer;
