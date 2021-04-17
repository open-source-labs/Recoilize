import React, {useEffect} from 'react';
import MainContainer from '../Containers/MainContainer';
import {selectedTypes} from '../../types';
// importing the diff to find difference
import {diff} from 'jsondiffpatch';
import {useAppSelector, useAppDispatch} from '../state-management/hooks';
import {
  setSnapshotHistory,
  setRenderIndex,
  setCleanComponentAtomTree,
} from '../state-management/slices/SnapshotSlice';
import {
  addSelected,
  setSelected,
} from '../state-management/slices/SelectedSlice';
import {
  updateFilter,
  selectFilterState,
} from '../state-management/slices/FilterSlice';

const LOGO_URL = './assets/Recoilize.png';
const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // useState hook to update the snapshotHistory array
  // array of snapshots
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const renderIndex = useAppSelector(state => state.snapshot.renderIndex);
  const selected = useAppSelector(state => state.selected.selectedData);
  // selected will be an array with objects containing filteredSnapshot key names (the atoms and selectors)
  // ex: [{name: 'Atom1'}, {name: 'Atom2'}, {name: 'Selector1'}, ...]
  // const [selected, setSelected] = useState<selectedTypes[]>([]);

  // todo: Create algo that will clean up the big setSnapshothistory object, now and before
  // ! Setting up the selected
  const filterData = useAppSelector(selectFilterState);

  // Whenever snapshotHistory changes, useEffect will run, and selected will be updated
  useEffect(() => {
    // whenever snapshotHistory changes, update renderIndex
    dispatch(setRenderIndex(snapshotHistory.length - 1));

    let last;
    if (snapshotHistory[renderIndex]) {
      last = snapshotHistory[renderIndex].filteredSnapshot;
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
          console.log("after Check");
          dispatch(addSelected({name: key}));
        }
      }
    }
  }, [snapshotHistory]); // Only re-run the effect if snapshot history changes -- react hooks

  //Update cleanComponentAtomTree as Render Index changes

  useEffect(() => {
    if (snapshotHistory.length === 0) return;
    dispatch(
      setCleanComponentAtomTree(snapshotHistory[renderIndex].componentAtomTree),
    );
  }, [renderIndex]);

  // useEffect for snapshotHistory
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
        if (!msg.payload[1]) {
          // ensures we only set initially
          const arr: selectedTypes[] = [];
          for (let key in msg.payload[0].filteredSnapshot) {
            arr.push({name: key});
          }
          // setSelected(arr);
          dispatch(setSelected(arr));
        }

        dispatch(setSnapshotHistory(msg.payload[msg.payload.length - 1]));

        // ! Setting the FILTER Array
        if (!msg.payload[1] && filterData.length === 0) {
          // todo: currently the filter does not work if recoilize is not open, we must change msg.payload to incorporate delta function in the backend
          dispatch(updateFilter(msg.payload));
        } else {
          // push the difference between the objects
          const delta = diff(
            msg.payload[msg.payload.length - 2],
            msg.payload[msg.payload.length - 1],
          );
          // only push if the snapshot length is chill
          if (filterData.length < msg.payload.length) {
            dispatch(updateFilter([delta]));
          }
        }
      }
    });
  }, []);

  // Render main container if we have detected a recoil app with the recoilize module passing data
  const renderMainContainer: JSX.Element = <MainContainer />;

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
