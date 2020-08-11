import React, {useState} from 'react';
import {diff, formatters} from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import {filteredSnapshot} from '../../../types';

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
      <div>Pin State</div>
      <div>Throttle Setting</div>
    </div>
  );
};

export default Settings;
