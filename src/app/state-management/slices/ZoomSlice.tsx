import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface ZoomState {
  zoomData: any;
}

const initialState: ZoomState = { // starting x, y positions on SVG canvas
  zoomData: { // x: 18, y: 527, k: 0.12 - updated x: 100, y: 527, k: 0.09
    x: 220,
    y: 850,
    k: 0.09,
  },
};

export const zoomSlice = createSlice({
  name: 'zoom',
  initialState,
  reducers: {
    updateZoomState: (state, action: PayloadAction<ZoomState>) => {
      state.zoomData = action.payload;
    },
    setDefaultZoom: state => {
      state.zoomData = initialState.zoomData;
    },
  },
});

export const {updateZoomState, setDefaultZoom} = zoomSlice.actions;
export const selectZoomState = (state: RootState) => state.zoom.zoomData;

const zoomReducer = zoomSlice.reducer;

export default zoomReducer;
