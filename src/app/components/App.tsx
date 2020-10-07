import React, {useState, useEffect} from 'react';
import MainContainer from '../Containers/MainContainer';
import {stateSnapshot, selectedTypes, stateSnapshotDiff} from '../../types';
// importing the diff to find difference
import {diff} from 'jsondiffpatch';
const LOGO_URL = './assets/Recoilize.png';
const App: React.FC = () => {
  // useState hook to update the snapshotHistory array
  const [snapshotHistory, setSnapshotHistory] = useState<stateSnapshot[]>([]);
  // todo: created selected to update array
  const [selected, setSelected] = useState<selectedTypes[]>([]);

  // todo: Create algo that will clean up the big setsnapshothistory object, now and before
  let [filter, setFilter] = useState<stateSnapshotDiff[]>([]);
  // ! Setting up the selected
  useEffect(() => {
    let last;
    if (snapshotHistory[snapshotHistory.length - 1]) {
      last = snapshotHistory[snapshotHistory.length - 1].filteredSnapshot;
    }
    // we must compare with the original
    for (let key in last) {
      if (!snapshotHistory[0].filteredSnapshot[key]) {
        // only push if the name doesn't already exist
        const check = () => {
          for (let i = 0; i < selected.length; i++) {
            // break if it exists
            if (selected[i].name === key) {
              return true;
            }
          }
          // does not exist
          return false;
        };
        if (!check()) {
          selected.push({name: key});
        }
      }
    }
  }, [snapshotHistory]); // Only re-run the effect if snapshot history changes -- react hooks
  // use effect for snapshotHistory
  useEffect(() => {
    // SETUP connection to bg script
    const backgroundConnection = chrome.runtime.connect();
    // INITIALIZE connection to bg script
    backgroundConnection.postMessage({
      action: 'devToolInitialized',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    // LISTEN for messages FROM bg script
    backgroundConnection.onMessage.addListener(msg => {
      if (msg.action === 'recordSnapshot') {
        // ! sets the initial selected
        if (!msg.payload[1] || filter.length === 0) {
          // ensures we only set initially
          const arr: selectedTypes[] = [];
          for (let key in msg.payload[0].filteredSnapshot) {
            arr.push({name: key});
          }
          setSelected(arr);
        }
        // ! Set the snapshot history state
        setSnapshotHistory(msg.payload);
        // ! Setting the FILTER Array
        if (!msg.payload[1] || filter.length === 0) {
          // todo: currently the filter does not work if recoilize is not open, we must change msg.payload to incorporate delta function in the backend
          filter = msg.payload;
          setFilter(msg.payload);
        } else if (filter.length === 0) {
          filter.push(msg.payload[0]);
          setFilter(filter);
        } else {
          // push the difference between the objects
          const delta = diff(
            msg.payload[msg.payload.length - 2],
            msg.payload[msg.payload.length - 1],
          );
          // only push if the snapshot length is chill
          if (filter.length < msg.payload.length) {
            filter.push(delta);
            setFilter(filter);
          }
        }
      }
    });
  }, []);
  // Render main container if we have detected a recoil app with the recoilize module passing data
  const renderMainContainer: JSX.Element = (
    <MainContainer
      // array of snapshots
      snapshotHistory={snapshotHistory}

      // selected will be an array with objects containing filteredSnapshot key names (the atoms and selectors)
      // ex: [{name: 'Atom1'}, {name: 'Atom2'}, {name: 'Selector1'}, ...]
      selected={selected}
      setSelected={setSelected}

      // Filter is an array of objects containing differences between snapshots.
      filter={filter}
    />
  );
  // Render module not found message if snapHistory is null, this means we have not detected a recoil app with recoilize module installed properly
  const renderModuleNotFoundContainer: JSX.Element = (
    <div className="notFoundContainer">
      <img className="logo" src={LOGO_URL} />
      <p>
        Supported only with Recoil apps with the Recoilize NPM module. Follow
        the installation instructions at
        <br />
        <a target="_blank" href="https://github.com/open-source-labs/Recoilize">
          Recoilize
        </a>
      </p>
    </div>
  );
  return (
    <div className="App" key="App">
      {snapshotHistory.length
        ? renderMainContainer
        : renderModuleNotFoundContainer}
    </div>
  );
};
export default App;
