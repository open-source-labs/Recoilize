import React, {useState} from 'react';

interface ThrottlesettingsProps {
  throttleDisplay: string;
  setThrottleDisplay: React.Dispatch<React.SetStateAction<string>>;
}

const ThrottleSettings: React.FC<ThrottlesettingsProps> = ({
  throttleDisplay,
  setThrottleDisplay,
}) => {
  const [buttonClicked, setButtonClicked] = useState(null);
  const [throttleNum, setThrottleNum] = useState('');
  //onChange function to set throttleNum
  const onChange = (e: any) => {
    setThrottleNum(e.target.value);
  };

  // Creating function to tie to get to the backend
  const throttleFunc = (e: any) => {
    e.preventDefault();
    if (buttonClicked === 2) setThrottleNum('0');
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
          style={{marginBottom: '10px'}}
          onChange={onChange}
          value={throttleNum}
        />{' '}
        <span style={{fontSize: '14px'}}>milliseconds</span>
        <div>
          <button onClick={() => setButtonClicked(1)} type="submit">
            Enter
          </button>
          <button onClick={() => setButtonClicked(2)} type="submit">
            Reset
          </button>
        </div>
      </form>
      <span>Current throttle is {throttleDisplay} ms</span>
    </div>
  );
};

export default ThrottleSettings;
