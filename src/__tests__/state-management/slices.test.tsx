import { setSearchValue } from '../../app/state-management/slices/AtomNetworkSlice';
import { setSelected, addSelected } from '../../app/state-management/slices/SelectedSlice';
import { updateFilter } from '../../app/state-management/slices/FilterSlice';
import {
  setSnapshotHistory,
  setRenderIndex,
  setCleanComponentAtomTree,
} from '../../app/state-management/slices/SnapshotSlice';
import { newThrottle, resetThrottle } from '../../app/state-management/slices/ThrottleSlice';
import { setDefaultZoom, updateZoomState } from '../../app/state-management/slices/ZoomSlice';
import { store } from '../../app/state-management/index';
import { snapshotHistoryMock } from '../../../mock/state-snapshot';


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

describe('FilterSlice', () => {
  it('update filter', () => {
    store.dispatch(updateFilter(['square-8']));
    const filterData = store.getState().filter.filterData;
    expect(filterData).toEqual(['square-8']);
  });
});

describe('SnapshotSlice', () => {
  it('set render index', () => {
    store.dispatch(setRenderIndex(10));
    const renderIndex = store.getState().snapshot.renderIndex;
    expect(renderIndex).toEqual(10);
  });

  it('set cleaned component atom tree', () => {
    store.dispatch(
      setCleanComponentAtomTree(
        snapshotHistoryMock.snapshotHistory[0].componentAtomTree,
      ),
    );
    const cleanedComponentAtomTreeData = store.getState().snapshot
      .cleanComponentAtomTree;

    const result: any = {
      children: [
        {
          actualDuration: 0.8450000004813774,
          children: [],
          name: 'PlaygroundStart',
          recoilNodes: [],
          tag: 0,
          treeBaseDuration: 0.5550000005314359,
          wasSuspended: false,
        },
      ],
      name: 'PlaygroundRender',
      recoilNodes: ['playStart'],
      tag: 0,
      actualDuration: 1.6750000004321919,
    };

    expect(cleanedComponentAtomTreeData).toEqual(result);
  });

  it('set snapshot', () => {
    store.dispatch(setSnapshotHistory(snapshotHistoryMock));
    const snapshotData = store.getState().snapshot.snapshotHistory;
    expect(snapshotData).toEqual([snapshotHistoryMock]);
  });
});

describe('SelectedSlice', () => {
  beforeEach(() => {
    store.dispatch(setSelected([]));
  });

  it('set selected item', () => {
    store.dispatch(setSelected(['square-8']));
    const selectedData = store.getState().selected.selectedData;
    expect(selectedData).toEqual(['square-8']);
  });

  it('add selected item', () => {
    store.dispatch(addSelected('square-8'));
    const selectedData = store.getState().selected.selectedData;
    expect(selectedData).toEqual(['square-8']);
  });
});
