import React from 'react';
import {stateSnapshot, selectedTypes} from '../../../types';

// Importing various settings components
import StateSettings from './StateSettings';
import ThrottleSettings from './ThrottleSettings';
import AtomSettings from './AtomSettings';

interface SettingsProps {
  snapshotHistory: stateSnapshot[];
  selected: selectedTypes[];
  setSelected: React.Dispatch<React.SetStateAction<selectedTypes[]>>;
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
