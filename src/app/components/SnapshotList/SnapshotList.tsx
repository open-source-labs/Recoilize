// renders a list of all of the snapshots that were taking
import React, {useEffect, useRef} from 'react';
import {stateSnapshot, selectedTypes} from '../../../types';
interface SnapshotsListProps {
  // index of current snapshot rendered in devtool
  renderIndex: number;
  // length of snapshotHistory array
  snapshotHistoryLength: number;
  // setState functionality to update renderIndex
  setRenderIndex: React.Dispatch<React.SetStateAction<number>>;
  // functionality to postMessage the selected snapshot index to background.js
  timeTravelFunc: (index: number) => void;
  selected: selectedTypes[];
  filter: stateSnapshot[];
}

const SnapshotsList: React.FC<SnapshotsListProps> = ({
  renderIndex,
  snapshotHistoryLength,
  setRenderIndex,
  timeTravelFunc,
  selected,
  filter,
}) => {
  // useRef for a dummy div at the bottom of the scroll
  const snapshotEndRef = useRef<HTMLDivElement>(null);

  // useEffect to scroll bottom whenever snapshot history changes
  useEffect(() => {
    scrollToBottom();
  }, [snapshotHistoryLength]);

  // using scrollInToView makes a smoother scroll
  const scrollToBottom = (): void => {
    snapshotEndRef.current.scrollIntoView({behavior: 'smooth'});
  };

  const snapshotDivs: JSX.Element[] = [];
  // iterate the same length of our snapshotHistory
  for (let i = 0; i < snapshotHistoryLength; i++) {
    // filter function
    const filterFunc = (): boolean => {
      // don't use the counter for this, not reliable
      if (i === 0) {
        return true;
      }
      // checks if is in the selected array
      if (filter[i]) {
        for (let key in filter[i].filteredSnapshot) {
          for (let j = 0; j < selected.length; j++) {
            if (key === selected[j].name) {
              return true;
            }
          }
        }
      }
      return false;
    };
    const x: boolean = filterFunc();
    // see the iteration if x is false
    if (x === false) {
      continue;
    }
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
  return (
    <div className="SnapshotsList">
      <div>{snapshotDivs}</div>
      <div ref={snapshotEndRef} />
    </div>
  );
};
export default SnapshotsList;
//document.getElementById('root')._reactRootContainer._internalRoot.current.child.memoizedState.next.next.memoizedState.current.currentTree.atomValues
