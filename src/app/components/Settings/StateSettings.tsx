import React from 'react';

interface StateSettingsProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateSettings: React.FC<StateSettingsProps> = ({checked, setChecked}) => {
  // functionality to postMessage the selected snapshot index to background.js
  const persistStateFunc = (): void => {
    // setChecked as true or false
    checked ? setChecked(false) : setChecked(true);
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'persistState',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  };
  return (
    <div data-testid="stateSettings">
      <h2>Persist State</h2>
      <div className="persistContainer">
        <label className="switch" htmlFor="checkbox">
          <input
            data-testid="stateSettingsToggle"
            id="checkbox"
            type="checkbox"
            checked={checked}
            onChange={persistStateFunc}></input>
          <div className="slider round" />{' '}
        </label>
        <span className="persistText">Slide to Toggle Persist Mode</span>
      </div>
    </div>
  );
};

export default StateSettings;
