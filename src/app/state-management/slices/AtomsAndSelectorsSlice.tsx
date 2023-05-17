import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface selectedState {
  atomsAndSelectors: {
    atoms: string[];
    selectors: string[];
    $selectors: any;
  };
}

const initialState: selectedState = {
  atomsAndSelectors: {
    atoms: [],
    selectors: [],
    $selectors: {},
  },
};


export const atomsAndSelectorsSlice = createSlice({
  name: 'atomsAndSelectors',
  initialState,
  reducers: {
    setAtomsAndSelectors: (state, action: PayloadAction<any>) => {
      state.atomsAndSelectors = action.payload;
    },
  },
});


export const {setAtomsAndSelectors} = atomsAndSelectorsSlice.actions;

export const selectAtomsAndSelectorsState = (state: RootState) => state.atomsAndSelectors;

export default atomsAndSelectorsSlice.reducer;
