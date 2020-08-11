import React, {useState} from 'react';
import {diff, formatters} from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import {filteredSnapshot} from '../../../types';

import ThrottleSettings from './SettingsComponents/ThrottleSettings';

// interface SettingsProps {
//   // snapshot at index [curRender -1]
//   filteredPrevSnap: filteredSnapshot;
//   // snapshot at index [curRender]
//   filteredCurSnap: filteredSnapshot;
// }

// renders the difference between the most recent state change and the previous
const Settings: React.FC = () => {
  return (
    <div className="Settings">
      <div>Atom and Selectors Filter</div>
      <div>State Management</div>
      <ThrottleSettings />
    </div>
  );
};

export default Settings;
