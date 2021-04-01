import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface FilterState {
    filterData: any,
}

const initialState: FilterState = {
    filterData: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<any>) => {
      console.log('We are inside updateFilter: ', action.payload);
      console.log('This is pre-state inside updateFilter: ', state.filterData);
      state.filterData = [...state.filterData, ...action.payload];
      console.log('This is post-state inside updateFilter: ', state.filterData);
    },
  },
});

export const {updateFilter} = filterSlice.actions;
export const selectFilterState = (state: RootState) => state.filter.filterData;

const filterReducer = filterSlice.reducer;

export default filterReducer;
