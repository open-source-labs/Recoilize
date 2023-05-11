import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {selectedTypes} from '../../../types';

interface selectedState {
  selectedData: selectedTypes[];
};

const initialState: selectedState = {
  selectedData: [],
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<any>) => {
      state.selectedData = action.payload;
    },
    addSelected: (state, action: PayloadAction<any>) => {
      state.selectedData.push(action.payload);
    },
  },
});

export const {setSelected, addSelected} = selectedSlice.actions;
// export const selectedState = (state: RootState) => state.selected.selectedData;

const selectedReducer = selectedSlice.reducer;

export default selectedReducer;
