import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface selectedState {
  atomsAndSelectors: {};
}

const initialState: selectedState = {
  atomsAndSelectors: {},
};

// zoom: zoomReducer,
// throttle: throttleReducer,
// snapshot: snapshotReducer,
// atomNetwork: atomNetworkReducer,
// filter: filterReducer,
// selected: selectedReducer,

export const atomsAndSelectorsSlice = createSlice({
  name: 'atomsAndSelectors',
  initialState,
  reducers: {
    setAtomsAndSelectors: (state, action: PayloadAction<any>) => {
      state.atomsAndSelectors = action.payload;
    },
  },
});

console.log('atomsAndSelectorsSlice:', atomsAndSelectorsSlice);

export const {setAtomsAndSelectors} = atomsAndSelectorsSlice.actions;

export default atomsAndSelectorsSlice.reducer;
