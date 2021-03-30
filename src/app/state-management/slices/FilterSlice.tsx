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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFilterState = (state: RootState) => state.filter.filterData;

const filterReducer = filterSlice.reducer;

export default filterReducer;
