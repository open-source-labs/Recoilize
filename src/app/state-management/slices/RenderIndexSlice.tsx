// import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {RootState} from '../index';

// interface RenderIndexState {
//     renderIndex: number;
// }

// const initialState: RenderIndexState = {
//     renderIndex: null
// };

// export const renderIndexSlice = createSlice({
//   name: 'renderIndex',
//   initialState,
//   reducers: {
//     updateRenderIndex: (state, action: PayloadAction<ZoomState>) => {
//       state.zoomData = action.payload;
//     },
//     setDefaultZoom: state => {
//       console.log('set default called');
//       state.zoomData = initialState.zoomData;
//     },
//   },
// });

// export const {updateZoomState, setDefaultZoom} = zoomSlice.actions;

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// // export const incrementAsync = (amount: number): AppThunk => dispatch => {
// //   setTimeout(() => {
// //     dispatch(incrementByAmount(amount));
// //   }, 1000);
// // };

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectRenderIndexState = (state: RootState) => state.zoom.zoomData;

// const renderIndexReducer = renderIndexSlice.reducer;

// export default renderIndexReducer;
