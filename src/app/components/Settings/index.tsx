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
}

// renders the difference between the most recent state change and the previous
const Settings: React.FC<SettingsProps> = ({
  snapshotHistory,
  selected,
  setSelected,
}) => {
  return (
    <div className="Settings">
      <AtomSettings
        snapshotHistory={snapshotHistory}
        selected={selected}
        setSelected={setSelected}
      />
      <StateSettings />
      <ThrottleSettings />
    </div>
  );
};

export default Settings;
