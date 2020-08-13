import React, {useState} from 'react';

const ThrottleSettings: React.FC = () => {
  // variable to store/reference connection
  let num = '';
  const onChange = (event: string) => {
    num = event;
  };
  // Creating function to tie to get to the backend
  const throttleFunc = () => {
    const backgroundConnection = chrome.runtime.connect();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'throttleEdit',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: {value: num}, // edit this value to some other number
    });
  };
  return (
    <div>
      <h2>Enter Throttle</h2>
      <input onChange={e => onChange(e.target.value)} /> milliseconds
      <div>
        <button
          onClick={() => {
            throttleFunc();
          }}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default ThrottleSettings;
