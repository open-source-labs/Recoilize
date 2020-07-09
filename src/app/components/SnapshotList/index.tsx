// renders a list of all of the snapshots that were taking
import React from 'react';
import { stateSnapshot } from '../../../types';

interface SnapshotsListProps {
  // index of current snapshot rendered in devtool
  curRender: number;
  // array of object snapshots of user's state
  setCurRender: React.Dispatch<React.SetStateAction<number>>;
  // setState functionality to update curRender
  snapshotHistory: stateSnapshot[];
  // functionality to postMessage the selected snapshot index to background.js
  setSnapshotTimeTravelIndex: (index: number) => void;
}

const SnapshotsList: React.FC<SnapshotsListProps> = ({
  curRender,
  setCurRender,
  snapshotHistory,
  setSnapshotTimeTravelIndex,
}) => {
  // array of individual snapshots with setCurRender and timeTravel functionality
  const listOfSnapshots = snapshotHistory.reduce<JSX.Element[]>((acc, _curSnap, i) => {
    acc.push(
      <div
        className="individualSnapshot"
        key={i}
        style={
          curRender === i
            ? { color: '#E6E6E6', backgroundColor: '#212121' }
            : { color: '#989898' }
        }
        onClick={() => {
          setCurRender(i);
        }}>
        <li>{i}</li>
        <button
          className="timeTravelButton"
          onClick={() => {
            setSnapshotTimeTravelIndex(i);
          }}>
          Time Travel
        </button>
      </div>,
    );
    return acc;
  }, []);
  // render the array of snapshots divs generated above
  return <div className="SnapshotsList">{listOfSnapshots}</div>;
};

export default SnapshotsList;
