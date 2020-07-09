import React, {useState} from 'react';
import {diff, formatters} from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import { stateSnapshot } from '../../../types'

interface DiffProps {
  // snapshot at index [curRender -1]
  oldSnap: stateSnapshot;
  // snapshot at index [curRender]
  newSnap: stateSnapshot;
}

// renders the difference between the most recent state change and the previous
const Diff: React.FC<DiffProps> = ({oldSnap, newSnap}) => {
  // useState hook to update the toggle of showUnchanged or hideUnchanged
  const [rawToggle, setRawToggle] = useState(false);
  // diffing between oldSnap && newSnap
  const delta = diff(oldSnap, newSnap);
  // string of html with comparisons
  const html = formatters.html.format(delta, oldSnap);
  // conditionally render changes or not based on rawToggle bool
  formatters.html.showUnchanged(rawToggle);

  return (
    <div className="Diff">
      <div className="toggleDiv">
        <button
          className="rawToggle"
          style={{color: rawToggle ? '#E6E6E6' : '#989898'}}
          onClick={() => {
            setRawToggle(!rawToggle);
          }}>
          Raw
        </button>
      </div>
      {ReactHtmlParser(html)}
    </div>
  );
};

export default Diff;
