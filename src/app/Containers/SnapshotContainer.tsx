import React, {useEffect, useRef} from 'react';
/* dependency import notes/ explanations:
  - { useRef }: a React Hook that lets you reference a value that’s not needed for rendering. It’s particularly common to use a ref to manipulate the DOM. React has built-in support for this.
*/

import {useAppSelector, useAppDispatch} from '../state-management/hooks'; // -> these hooks are created in a separate file per documentation (5.2023 KW)

/* import FUNCTIONS used in this container */
import filterFunc from '../functions/SnapshotContainerFunctions/filterFunc'; // -> used to compare state
import timeTravelFunc from '../functions/SnapshotContainerFunctions/timeTravelFunc';
import toLocalStorage from '../functions/SnapshotContainerFunctions/toLocalStorage';

/* import STATE MANAGEMENT SLICES used in this container */
import {selectFilterState} from '../state-management/slices/FilterSlice';
import {setRenderIndex} from '../state-management/slices/SnapshotSlice';



// refactored from React.FC (not recommended) (5.2023 KW)
export const SnapshotsContainer: React.FC = () => {
    // The useDispatch hook (which is utilized in useAppDispatch -> see hooks file) returns a function. So it is assigned to a variable. Then, in the “onClick” function below, it is used to dispatch the 'setRenderIndex' action. (5.2023 KW)
  const dispatch = useAppDispatch();

  // the useSelector hook (which is utilized in useAppDispatch -> see hooks file) is used to extract 'state' from the global state. We can take out any state we want to use in the component using the same way (5.2023 KW)
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const selected = useAppSelector(state => state.selected.selectedData);

  const renderIndex = useAppSelector(state => state.snapshot.renderIndex);
  
  const filterData = useAppSelector(selectFilterState);
  
  const snapshotEndRef = useRef<null | HTMLDivElement>(null);

  let snapshotHistoryLength = snapshotHistory.length;


  /* <--- AUTO SCROLL TO BOTTOM -----> */
  // this will automatically scroll us to the bottom when the snapshot history changes
  useEffect(() => {
    snapshotEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [snapshotHistoryLength]);


  // creating empty array for snapshots to be pushed into as they are created
  const snapshotDivs: JSX.Element[] = [];
  // iterate the same length of our snapshotHistory to create a snapshotDiv for each
  for (let i = 0; i < snapshotHistoryLength; i++) {
    // filterFunc will return false if there is no change to state
    const x: boolean = filterFunc(i, filterData, selected);

    if (x === false) {
      continue;
    }

    // renderTime is set equal to the actualDuration. If i is zero then we are obtaining actualDuration from the very first snapshot in snapshotHistory. This is to avoid having undefined filter elements since there will be no difference between snapshot at the first instance.
    let renderTime: number =
      snapshotHistory[i].componentAtomTree.treeBaseDuration;
 

    snapshotDivs.push(
      <div
        id={`snapshot${i}`}
        className="individualSnapshot"
        key={i}
        style={
          renderIndex === i
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {color: '#989898'}
        }
        onClick={() => {
          dispatch(setRenderIndex(i));
        }}>
        <li>{`${Math.round(renderTime * 100) / 100}ms`}</li>
        <button
          className="timeTravelButton"
          style={
            renderIndex === i
              ? {color: '#E6E6E6', backgroundColor: '#212121'}
              : {}
          }
          onClick={() => {
            timeTravelFunc(i, filterData);
          }}>
          Jump
        </button>
      </div>,
    );
  };

  /* <----- FORWARD CLEAR -----> */
  // function to remove all snapshots ahead of selected snapshot (removes divs)
  // would maybe try to move this to different file to shorten this code further. didn't have time to get this to work (5.2023 KW)
  function fwrdClr() {
    const snapshotListArr = document.querySelectorAll('.individualSnapshot');
  
    for (let i = snapshotListArr.length - 1; i >= 0; i--) {
      let index = parseInt(snapshotListArr[i].id.match(/\d+/g)[0]);
  
      if (index > renderIndex) {
        snapshotListArr[i].parentNode.removeChild(snapshotListArr[i]);
      } else break;
    };
  };

  /* <----- PREVIOUS CLEAR -----> */
  // function to remove all snapshots behind selected snapshot (removes divs)
  // would maybe try to move this to different file to shorten this code further. didn't have time to get this to work (5.2023 KW)
  function prevClr() {
    const snapshotListArr = document.querySelectorAll('.individualSnapshot');
  
    for (let i = 0; i < snapshotListArr.length; i++) {
      let index = parseInt(snapshotListArr[i].id.match(/\d+/g)[0]);
  
      if (index < renderIndex) {
        snapshotListArr[i].parentNode.removeChild(snapshotListArr[i]);
      } else break;
    }
  };


  return (
    <div className="SnapshotsContainer" data-testid="SnapshotsContainer">
      <div id="clear-snapshots-title" data-testid="clear-snapshots-title">Clear Snapshots</div>
      <div className="clear-buttons">
        <button onClick={prevClr} id="prevClr">
          Previous
        </button>
        <button onClick={fwrdClr} id="fwrdClr">
          Forward
        </button>
      </div>
      <span
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '10px',
          marginBottom: '10px',
        }}>
        Snapshots
      </span>
      <button
        className="save-series-button"
        onClick={(e) => {
          toLocalStorage(snapshotHistory);
        }}>
        Save Series
      </button>
      <div className="SnapshotsList" data-testid="SnapshotsList">
        <div data-testid="snapshotDiv">{snapshotDivs}</div>
        <div ref={snapshotEndRef} />
      </div>
    </div>
  );
};