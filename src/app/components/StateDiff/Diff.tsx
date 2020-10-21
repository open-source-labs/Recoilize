import React, {useState, useEffect} from 'react';
import {diff, formatters} from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import {filteredSnapshot} from '../../../types';

interface DiffProps {
  // snapshot at index [curRender -1]
  filteredPrevSnap: filteredSnapshot;
  // snapshot at index [curRender]
  filteredCurSnap: filteredSnapshot;
  //length of snapshotHistory
}

// renders the difference between the most recent state change and the previous
const Diff: React.FC<DiffProps> = ({filteredPrevSnap, filteredCurSnap}) => {
  // console.log('this is the filteredSnap ', filteredCurSnap);
  // useState hook to update the toggle of showUnchanged or hideUnchanged
  const [rawToggle, setRawToggle] = useState(false);
  // diffing between filteredPrevSnap && filteredCurSnap
  const delta = diff(filteredPrevSnap, filteredCurSnap);
  // console.log('this is the delta ', delta);
  // string of html with comparisons
  const html = formatters.html.format(delta, filteredPrevSnap);
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
