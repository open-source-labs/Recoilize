// renders a list of all of the snapshots that were taking
import React from 'react';
import {stateSnapshot} from '../../../types';

interface SnapshotsListProps {
  // index of current snapshot rendered in devtool
  renderIndex: number;
  // length of snapshotHistory array
  snapshotHistoryLength: number;
  // setState functionality to update renderIndex
  setRenderIndex: React.Dispatch<React.SetStateAction<number>>;
  // functionality to postMessage the selected snapshot index to background.js
  timeTravelFunc: (index: number) => void;
  selected: any;
}

let filterArray: any[] = [];

const SnapshotsList: React.FC<SnapshotsListProps> = ({
  renderIndex,
  snapshotHistoryLength,
  setRenderIndex,
  timeTravelFunc,
  selected,
}) => {
  // ! probably need to prop drill down something else as well to get this filter to work
  console.log('this is selected inside SnapshotList ', selected);
  // array of divs proportional to the length of snapshotHistory
  const snapshotDivs: JSX.Element[] = [];
  // iterate the same length of our snapshotHistory
  for (let i = 0; i < snapshotHistoryLength; i++) {
    // using the selected, and comparing to an array, if it is in continue
    snapshotDivs.push(
      <div
        className="individualSnapshot"
        key={i}
        style={
          renderIndex === i
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {color: '#989898'}
        }
        onClick={() => {
          setRenderIndex(i);
        }}>
        <li>{i}</li>
        <button
          className="timeTravelButton"
          onClick={() => {
            timeTravelFunc(i);
          }}>
          Jump
        </button>
      </div>,
    );
  }
  /*
  Filter snapshotDivs to show only the snapshots that have
   an atom/selector from the Atom and Selector Filter in the Settings tab
  */

  // render the array of snapshots divs generated above
  return <div className="SnapshotsList">{snapshotDivs}</div>;
};

export default SnapshotsList;
export {filterArray};
//document.getElementById('root')._reactRootContainer._internalRoot.current.child.memoizedState.next.next.memoizedState.current.currentTree.atomValues
