import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface ZoomState {
  zoomData: any;
}

const initialState: ZoomState = {
  zoomData: {
    x: 18,
    y: 527,
    k: 0.12,
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
      // console.log('set default called');
      state.zoomData = initialState.zoomData;
    },
  },
});

export const {updateZoomState, setDefaultZoom} = zoomSlice.actions;
export const selectZoomState = (state: RootState) => state.zoom.zoomData;

const zoomReducer = zoomSlice.reducer;

export default zoomReducer;
