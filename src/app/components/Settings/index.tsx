import React, {useState} from 'react';
import {diff, formatters} from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import {filteredSnapshot} from '../../../types';

// Importing various settings components
import StateSettings from './SettingsComponents/StateSettings';
import ThrottleSettings from './SettingsComponents/ThrottleSettings';
import AtomSettings from './SettingsComponents/AtomSettings';

// interface SettingsProps {
//   // snapshot at index [curRender -1]
//   filteredPrevSnap: filteredSnapshot;
//   // snapshot at index [curRender]
//   filteredCurSnap: filteredSnapshot;
// }

interface StateSettingsProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

// renders the difference between the most recent state change and the previous
const Settings: React.FC<StateSettingsProps> = ({checked, setChecked}) => {
  return (
    <div className="Settings">
      <AtomSettings />
      <StateSettings checked={checked} setChecked={setChecked} />
      <ThrottleSettings />
    </div>
  );
};

export default Settings;
