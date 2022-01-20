import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import generateCleanComponentAtomTree from '../../utils/cleanComponentAtomTree';

const initialState: any = {
  snapshotHistory: [],
  renderIndex: 0,
  cleanComponentAtomTree: {},
};

export const snapshotSlice = createSlice({
  name: 'snapshotHistory',
  initialState,
  reducers: {
    setSnapshotHistory: (state, action: PayloadAction<any>) => {
      state.snapshotHistory.push(action.payload);
    },
    setRenderIndex: (state, action: PayloadAction<any>) => {
      state.renderIndex = action.payload;
    },
    setCleanComponentAtomTree: (state, action: PayloadAction<any>) => {
      state.cleanComponentAtomTree = generateCleanComponentAtomTree(
        action.payload,
      );
    },
  },
});

export const {setSnapshotHistory, setRenderIndex, setCleanComponentAtomTree} =
  snapshotSlice.actions;

export default snapshotSlice.reducer;
