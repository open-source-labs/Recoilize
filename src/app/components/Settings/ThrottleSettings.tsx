import React, {useState} from 'react';

interface ThrottlesettingsProps {
  throttleDisplay: string;
  setThrottleDisplay: React.Dispatch<React.SetStateAction<string>>;
}

const ThrottleSettings: React.FC<ThrottlesettingsProps> = ({
  throttleDisplay,
  setThrottleDisplay,
}) => {
  const [throttleNum, setThrottleNum] = useState<string>('');

  // onClick function for reset button. 70ms is the default throttle
  const onClick = (): void => {
    setThrottleDisplay('70');
    setThrottleNum('70');
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

    setThrottleDisplay(throttleNum);
    setThrottleNum('');
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
          <button onClick={onClick} type="submit">
            Reset
          </button>
        </div>
      </form>
      <span>
        Current throttle is{' '}
        {throttleDisplay === '70'
          ? `${throttleDisplay} (default)`
          : throttleDisplay}{' '}
        ms
      </span>
    </div>
  );
};

export default ThrottleSettings;
