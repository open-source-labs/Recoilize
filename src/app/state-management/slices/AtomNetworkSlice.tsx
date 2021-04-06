import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  searchValue: '',
};

export const atomNetworkSlice = createSlice({
  name: 'atomNetwork',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const {setSearchValue} = atomNetworkSlice.actions;

export default atomNetworkSlice.reducer;
