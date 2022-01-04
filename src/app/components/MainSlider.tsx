import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

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
      overlay={value}
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
  return (
    <div>
      <button>Start</button>
      <Slider min={0} max={1000} defaultValue={0} handle={handle} />
    </div>
  );
}

export default MainSlider;
