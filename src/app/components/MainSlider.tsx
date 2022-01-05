import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import {useAppSelector, useAppDispatch} from '../state-management/hooks';
import {setRenderIndex} from '../state-management/slices/SnapshotSlice';

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
  console.log('this is renderIndex ', renderIndex);
  console.log('this is snapshotHistory length ', snapshotHistory.length);
  return (
    <div>
      <Slider
        min={0}
        max={snapshotHistory.length - 1}
        value={renderIndex}
        onChange={(index: number) => {
          dispatch(setRenderIndex(index));
        }}
        handle={handle}
      />
    </div>
  );
}

export default MainSlider;
