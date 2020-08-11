import React, {useState} from 'react';

const ThrottleSettings: React.FC = () => {
  const throttleFunc = () => {
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'throttleEdit',
    });
  };
  return (
    <div>
      <h2>Enter Throttle</h2>
      <input></input> milliseconds
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
