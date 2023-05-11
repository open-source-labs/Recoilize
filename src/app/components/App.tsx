import React, {useEffect} from 'react';
// importing the diff to find difference (would maybe find an alternative to this?) (5.2023 KW)
import {diff} from 'jsondiffpatch';

/* <----- import types and custom hooks -----> */
import {selectedTypes} from '../../types';
import {useAppSelector, useAppDispatch} from '../state-management/hooks';

/* <----- import containers to be used in app -----> */
import { MainContainer } from '../Containers/MainContainer';
import { ModuleNotFoundContainer } from '../Containers/ModuleNotFoundContainer';

/* <----- import slices to be used in app -----> */
import { setAtomsAndSelectors } from '../state-management/slices/AtomsAndSelectorsSlice';
import { updateFilter, selectFilterState } from '../state-management/slices/FilterSlice';
import { addSelected, setSelected } from '../state-management/slices/SelectedSlice';
import { setSnapshotHistory, setRenderIndex, setCleanComponentAtomTree } from '../state-management/slices/SnapshotSlice';


const App = () => {
  const dispatch = useAppDispatch(); 

  // snapshotHistory contains the history of the app's state
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory
  ); 

  const renderIndex = useAppSelector(
    state => state.snapshot.renderIndex
  );

  /* selected will be an array with objects containing filteredSnapshot key names (atoms and selectors)
    ex: 
    [
      {name: 'Atom1'},
      {name: 'Atom2'},
      {name: 'Selector1'},
      ...
    ]
    (?.20?? ??)
  */
  
  const selected = useAppSelector(
    state => state.selected.selectedData
  ); 

 
  // initial state of filterData is an empty array. with each state change, the items that have changed are ALL that is added to this array. for example: tic-tac-toe -> if player X decides to play square 0, the nextPlayer (which was O) is updated, the contents of square 0 are updated. nothing else is included in the array (5.2023 KW)
  const filterData = useAppSelector(selectFilterState); 


  /* <----- UPDATE SELECTED STATE IN SNAPSHOT CONTAINER -----> */
  // automatically updates the state that is selected in the snapshot container (on left, where time and jump are displayed) to the most recent state (5.2023 KW) 
  useEffect(() => {
    dispatch(setRenderIndex(snapshotHistory.length - 1));
    
    let last;
    if (snapshotHistory[renderIndex]) {
      // updating the last state each time this useEffect is called
      last = snapshotHistory[renderIndex].filteredSnapshot;
    };

    // compare with first snapshot that was taken (original)
    for (let key in last) {
      // only push if name (key) does not exist
      if (!snapshotHistory[0].filteredSnapshot[key]) {
        const check = () => {
          for (let i = 0; i < selected.length; i++) {
            // break if name exists
            return true;
          };
          return false;
        };
        // new key is added if check returns false
        if (!check()) {
          dispatch(addSelected({name: key}));
        }
      }
    }
  }, [snapshotHistory]);


  /* <----- UPDATING cleanComponentAtomTres AS renderIndex CHANGES -----> */
  useEffect(() => {
    if (snapshotHistory.length === 0) return;
    dispatch(setCleanComponentAtomTree(snapshotHistory[renderIndex].componentAtomTree));
  }, [renderIndex]);


  /* <----- SNAPSHOTHISTORY -----> */
  useEffect(() => {
    // setup connection to background script
    const backgroundConnection = chrome.runtime.connect();
    // initialize connection to background script
    backgroundConnection.postMessage({
      action: 'devToolInitialized',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    // listen for messages from background script
    backgroundConnection.onMessage.addListener(msg => {
      if (msg.action === 'recordSnapshot') {
        // only set initially
        if (!msg.payload[1]) {
          const arr: selectedTypes[] = [];
          for (let key in msg.payload[0].filteredSnapshot) {
            arr.push({name: key});
          }
          dispatch(setSelected(arr));
        }
        dispatch(setSnapshotHistory(msg.payload[msg.payload.length - 1]));
        // update state with atoms and selectors
        dispatch(setAtomsAndSelectors(msg.payload[0].atomsAndSelectors));

        // setting the filter array
        if (!msg.payload[1] && filterData.length === 0) {
          // todo: currently the filter does not work if recoilize is not open, we must change msg.payload to incorporate delta function in the backend (0.20?? ??)
          dispatch(updateFilter(msg.payload));
        } else {
          // push difference between objects (would maybe find alternative?)
          const delta = diff(
            msg.payload[msg.payload.length - 2],
            msg.payload[msg.payload.length - 1]
          );
          if (filterData.length < msg.payload.length) {
            dispatch(updateFilter([delta]));
          }
        };
      };
    });
  }, []);
  
  const renderMainContainer: JSX.Element = <MainContainer />;
  const renderModuleNotFoundContainer: JSX.Element = <ModuleNotFoundContainer />;


  // if the app has recoilize installed, render the main container. otherwise, render the module not found container (5.2023 KW)
  return (
    <div className="App" key="App">
      {snapshotHistory.length
        ? renderMainContainer
        : renderModuleNotFoundContainer}
    </div>
  );
};

export default App;