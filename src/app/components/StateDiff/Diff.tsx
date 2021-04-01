yimport React, {useState} from 'react';
import {diff, formatters} from 'jsondiffpatch';
import ReactHtmlParser from 'react-html-parser';
import {useAppSelector} from '../../state-management/hooks';

// renders the difference between the most recent state change and the previous
const Diff: React.FC = () => {
  //Retrieve snapshotHistory State from Redux Store
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const renderIndex = useAppSelector(state => state.snapshot.renderIndex);
  console.log('snapshotHistory in diff', snapshotHistory);

  const filteredPrevSnap = snapshotHistory[renderIndex - 1];

  const filteredCurSnap = snapshotHistory[renderIndex]
    ? snapshotHistory[renderIndex].filteredSnapshot
    : snapshotHistory[0].filteredSnapshot;

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
