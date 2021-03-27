import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {RootState} from '../index';

const initialState: any = {
  throttleValue: '70',
};

export const throttleSlice = createSlice({
  name: 'throttle',
  initialState,
  reducers: {
    newThrottle: (state, action) => {
      state.throttleValue = action.payload;
      console.log('new state', state);
    },
    resetThrottle: state => {
      state.throttleValue = '70';
      console.log('reset state', state);
    },
  },
});

export const {newThrottle, resetThrottle} = throttleSlice.actions;

// export const selectThrottle = (state: RootState) => state.throttle;

export default throttleSlice.reducer;
