import React, {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../state-management/hooks';
import {
  newThrottle,
  resetThrottle,
} from '../../state-management/slices/ThrottleSlice';

const ThrottleSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  const throttle = useAppSelector(state => state.throttle.throttleValue);
  console.log('Throttle', throttle);
  const [throttleNum, setThrottleNum] = useState<string>(throttle);
  console.log('Throttle Num', throttleNum);

  useEffect(() => {
    setThrottleNum(throttle);
  }, [throttle]);

  // onClick function for reset button. 70ms is the default throttle
  const onClick = (): void => {
    dispatch(resetThrottle());
  };

  // Creating function to tie to get to the backend
  const throttleFunc = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const backgroundConnection = chrome.runtime.connect();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'throttleEdit',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: {value: throttleNum}, // edit this value to some other number
    });

    dispatch(newThrottle(throttleNum));
  };

  return (
    <div>
      <h2>Enter Throttle</h2>
      <form onSubmit={throttleFunc}>
        <input
          type="text"
          style={{marginBottom: '10px'}}
          onChange={e => setThrottleNum(e.target.value)}
          value={throttleNum}
          placeholder="enter in milliseconds"
        />{' '}
        <span style={{fontSize: '14px'}}>milliseconds</span>
        <div>
          <button type="submit">Enter</button>
          <button onClick={onClick} type="button">
            Reset
          </button>
        </div>
      </form>
      <span>
        Current throttle is{' '}
        {throttle === '70' ? `${throttle} (default)` : throttle} ms
      </span>
    </div>
  );
};

export default ThrottleSettings;
