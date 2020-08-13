import React, {useState} from 'react';

const StateSettings: React.FC = () => {
  // functionality to postMessage the selected snapshot index to background.js
  const persistStateFunc = () => {
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'persistState',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  };
  return (
    <div>
      <h2>Persist State</h2>
      <input type="checkbox" onChange={persistStateFunc}></input> Checkmark to
      Save State
    </div>
  );
};

export default StateSettings;
