import React, {useState} from 'react';

const ThrottleSettings: React.FC = () => {
  // variable to store/reference connection
  const [throttleNum, setThrottleNum] = useState('');

  //onChange function to set throttleNum
  const onChange = (e: any) => {
    setThrottleNum(e.target.value);
  };

  // Creating function to tie to get to the backend
  const throttleFunc = (e: any) => {
    e.preventDefault();
    const backgroundConnection = chrome.runtime.connect();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'throttleEdit',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: {value: throttleNum}, // edit this value to some other number
    });
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
        <button type="submit">Enter</button>
        <span>Current throttle is {throttleNum} ms</span>
      </form>
    </div>
  );
};

export default ThrottleSettings;
