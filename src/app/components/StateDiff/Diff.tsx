import React, {useState} from 'react';
import {diff, formatters} from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import {filteredSnapshot} from '../../../types';
import {useAppSelector} from '../../state-management/hooks';


// renders the difference between the most recent state change and the previous
const Diff: React.FC = () => {
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const filteredPrevSnap = snapshotHistory[snapshotHistory.length - 2]
    ? snapshotHistory[snapshotHistory.length - 2].filteredSnapshot
    : snapshotHistory[0].filteredSnapshot;
  const filteredCurSnap = snapshotHistory[snapshotHistory.length - 1].filteredSnapshot;
  // useState hook to update the toggle of showUnchanged or hideUnchanged
  const [rawToggle, setRawToggle] = useState(false);
  // diffing between filteredPrevSnap && filteredCurSnap
  const delta = diff(filteredPrevSnap, filteredCurSnap);
  // string of html with comparisons
  const html = formatters.html.format(delta, filteredPrevSnap);
  // conditionally render changes or not based on rawToggle bool
  formatters.html.showUnchanged(rawToggle);

  return (
    <div className="Diff">
      <div className="toggleDiv">
        <button
          id="raw"
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
