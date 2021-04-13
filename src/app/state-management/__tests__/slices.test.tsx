// import {Reducer} from 'redux';
import {setSearchValue} from '../slices/AtomNetworkSlice';
import {updateFilter, selectFilterState} from '../slices/FilterSlice';
import {setSelected, addSelected} from '../slices/SelectedSlice';
import {
  setSnapshotHistory,
  setRenderIndex,
  setCleanComponentAtomTree,
} from '../slices/SnapshotSlice';
import {newThrottle, resetThrottle} from '../slices/ThrottleSlice';
import {
  setDefaultZoom,
  updateZoomState,
  selectZoomState,
} from '../slices/ZoomSlice';
import {useAppDispatch, useAppSelector} from '../hooks';
import {store} from '../index';

// let zoomState: any;
// let searchValue: string;

// beforeAll(() => {
//   zoomState = store.getState().zoom.zoomData;
//   searchValue = store.getState().atomNetwork.searchValue;
// });

describe('ZoomSlice', () => {
  it('update zoom state', () => {
    const obj: any = {
      x: 20,
      y: 530,
      k: 0.15,
    };
    store.dispatch(updateZoomState(obj));

    const newZoomState = store.getState().zoom.zoomData;

    expect(newZoomState.x).toEqual(20);
    expect(newZoomState.y).toEqual(530);
    expect(newZoomState.k).toEqual(0.15);
  });

  it('reset zoom state', () => {
    store.dispatch(setDefaultZoom());
    const defaultZoomState = store.getState().zoom.zoomData;
    expect(defaultZoomState.x).toEqual(18);
    expect(defaultZoomState.y).toEqual(527);
    expect(defaultZoomState.k).toEqual(0.12);
  });
});

describe('AtomNetworkSlice', () => {
  it('update search value', () => {
    store.dispatch(setSearchValue('square-8'));
    const newSearchValue = store.getState().atomNetwork.searchValue;
    expect(newSearchValue).toEqual('square-8');
  });
});

describe('ThrottleSlice', () => {
  it('update throttle', () => {
    store.dispatch(newThrottle('100'));
    const newThrottleValue = store.getState().throttle.throttleValue;
    expect(newThrottleValue).toEqual('100');
  });

  it('reset throttle', () => {
    store.dispatch(resetThrottle());
    const defaultThrottleValue = store.getState().throttle.throttleValue;
    expect(defaultThrottleValue).toEqual('70');
  });
});
