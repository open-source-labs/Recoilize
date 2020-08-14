import React, {useState} from 'react';

interface StateSettingsProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateSettings: React.FC<StateSettingsProps> = ({checked, setChecked}) => {
  // functionality to postMessage the selected snapshot index to background.js
  const persistStateFunc = () => {
    // setChecked as true
    setChecked(true);
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
      <input
        type="checkbox"
        checked={checked}
        onChange={persistStateFunc}></input>{' '}
      Checkmark to Save State
    </div>
  );
};

export default StateSettings;
