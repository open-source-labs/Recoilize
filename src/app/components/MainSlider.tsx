import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import {useAppSelector, useAppDispatch} from '../state-management/hooks';
import {setRenderIndex} from '../state-management/slices/SnapshotSlice';
import {selectFilterState} from '../state-management/slices/FilterSlice';

const {Handle} = Slider;

interface handleProps {
  className: string;
  prefixCls?: string;
  vertical?: boolean;
  offset: number;
  value: number;
  dragging?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  reverse?: boolean;
  index: number;
  tabIndex?: number;
}

const handle = (props: handleProps) => {
  const {value, dragging, index, ...restProps} = props;

  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={''}
      visible={dragging}
      placement="top"
      key={index}>
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

// interface MainSliderProps {
//   snapshotsLength: number;
// }

function MainSlider() {
  const dispatch = useAppDispatch();

  const renderIndex = useAppSelector(state => state.snapshot.renderIndex);
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const filterData = useAppSelector(selectFilterState);
  console.log('this is renderIndex ', renderIndex);
  console.log('this is snapshotHistory length ', snapshotHistory.length);

  //indexDiff is used to ensure the index of filter matches the index of the snapshots array in the backend
  let indexDiff: number = 0;
  if (filterData[0] && filterData[0].indexDiff) {
    indexDiff = filterData[0].indexDiff;
  }

  const timeTravelFunc = (index: number) => {
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    //const test = chrome.extension.getBackgroundPage();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'snapshotTimeTravel',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: {
        snapshotIndex: index + indexDiff,
      },
    });
  };
  return (
    <div>
      <Slider
        min={0}
        max={snapshotHistory.length - 1}
        value={renderIndex}
        onChange={(index: number) => {
          dispatch(setRenderIndex(index));
          timeTravelFunc(index);
        }}
        handle={handle}
      />
    </div>
  );
}

export default MainSlider;
