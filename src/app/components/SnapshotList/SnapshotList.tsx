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
  filter: any[];
  snapshotHistory: stateSnapshot[];
}

const SnapshotsList: React.FC<SnapshotsListProps> = ({
  renderIndex,
  snapshotHistoryLength,
  setRenderIndex,
  timeTravelFunc,
  selected,
  filter,
  snapshotHistory,
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
    
    // filterFunc will return false if there is no change to state
    const filterFunc = (): boolean => {
    
      // don't use the counter for this, not reliable
      if (i === 0) {
        return true;
      }
      // checks if the filterteredSnapshot object at index i has a key (atom or selector) found in the selected array. This would indicate that there was a change to that state/selector because filter is an array of objects containing differences between snapshots.
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
    
    if (x === false) {
      continue;
    }
    
    // renderTime is set equal to the actualDuration. If i is zero then we are obtaining actualDuration from the very first snapshot in snapshotHistory. This is to avoid having undefined filter elements since there will be no difference between snapshot at the first instance. 
    let renderTime: number;
    if(i === 0) {
      renderTime = snapshotHistory[0].componentAtomTree.treeBaseDuration;
    } 
    //Checks to see if the actualDuration within filter is an array. If it is an array then the 2nd value in the array is the new actualDuration.
    else if (Array.isArray(filter[i].componentAtomTree.actualDuration)) {
      renderTime = filter[i].componentAtomTree.treeBaseDuration[1];
    } else {
      renderTime = filter[i].componentAtomTree.treeBaseDuration;
    }

    // Push a div container to snapshotDivs array only if there was a change to state. 
    // The div container will contain renderTimes evaluated above.
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
        <li>{`${Math.round(renderTime*100)/100}ms`}</li>
        <button
          className="timeTravelButton"
          style={
          renderIndex === i
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {}
          }
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
