import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface selectedState {
  atomsAndSelectors: {
    atoms: string[];
    selectors: string[];
  };
}

const initialState: selectedState = {
  atomsAndSelectors: {
    atoms: [],
    selectors: [],
  },
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

export const selectAtomsAndSelectorsState = (state: RootState) => state.atomsAndSelectors;

export default atomsAndSelectorsSlice.reducer;
