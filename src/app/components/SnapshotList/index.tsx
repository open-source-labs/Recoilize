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
}

let filterArray: any[] = [];

const SnapshotsList: React.FC<SnapshotsListProps> = ({
  renderIndex,
  snapshotHistoryLength,
  setRenderIndex,
  timeTravelFunc,
}) => {
  // array of divs proportional to the length of snapshotHistory
  const snapshotDivs: JSX.Element[] = [];
  // iterate the same length of our snapshotHistory
  for (let i = 0; i < snapshotHistoryLength; i++) {
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
          // Currently, this onclick gets all of the data
          // let bigState = document.getElementById('root')._reactRootContainer
          //   ._internalRoot.current.child.memoizedState.baseState;
          // let lastBigState = bigState[bigState.length - 1].filteredSnapshot;
          // let lastBigStateArray = Object.keys(lastBigState);

          // filterArray = lastBigStateArray; // array that is exported to AtomSettings.tsx
          // console.log('This is filterArray: ', filterArray);

          // console.log('This is the initial big state', bigState[0]);
          // console.log('This is the LAST bigState: ', lastBigState);
          // console.log('This is the LAST bigState Array: ', lastBigStateArray);

          // bigState.forEach((el, i) => {
          //   console.log(
          //     `This is Jump Snapshot at Index ${i}`,
          //     el.filteredSnapshot,
          //   );
          // });

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
