import React, {useState} from 'react';
import {diff, formatters} from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import {filteredSnapshot} from '../../../types';
import {stateSnapshot} from '../../../types';

// Importing various settings components
import StateSettings from './SettingsComponents/StateSettings';
import ThrottleSettings from './SettingsComponents/ThrottleSettings';
import AtomSettings from './SettingsComponents/AtomSettings';

interface SettingsProps {
  snapshotHistory: stateSnapshot[];
  selected: any;
  setSelected: any;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  throttleDisplay: string;
  setThrottleDisplay: React.Dispatch<React.SetStateAction<string>>;
}

// renders the difference between the most recent state change and the previous
const Settings: React.FC<SettingsProps> = ({
  snapshotHistory,
  selected,
  setSelected,
  checked,
  setChecked,
  throttleDisplay,
  setThrottleDisplay,
}) => {
  return (
    <div className="Settings">
      <AtomSettings
        snapshotHistory={snapshotHistory}
        selected={selected}
        setSelected={setSelected}
      />
      <StateSettings checked={checked} setChecked={setChecked} />
      <ThrottleSettings
        throttleDisplay={throttleDisplay}
        setThrottleDisplay={setThrottleDisplay}
      />
    </div>
  );
};

export default Settings;
