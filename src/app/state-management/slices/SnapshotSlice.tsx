import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {stateSnapshot} from '../../../types';

const initialState: any = {
  snapshotHistory: [],
};

export const snapshotSlice = createSlice({
  name: 'snapshotHistory',
  initialState,
  reducers: {
    setSnapshotHistory: (state, action: PayloadAction<any>) => {
      console.log('state history', state.snapshotHistory);
      console.log('initial state', initialState);
      console.log('action', action);
      // state.snaphotHistory = [...state.snapshotHistory, action.payload];
      state.snapshotHistory.push(action.payload);
    },
  },
});

export const {setSnapshotHistory} = snapshotSlice.actions;

export default snapshotSlice.reducer;
