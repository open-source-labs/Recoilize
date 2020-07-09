// renders a list of all of the snapshots that were taking
import React from 'react';
import { stateSnapshot } from '../../../types';

interface SnapshotsListProps {
  // index of current snapshot rendered in devtool
  curRender: number;
  // array of object snapshots of user's state
  setCurRender: React.Dispatch<React.SetStateAction<number>>;
  // setState functionality to update curRender
  snapshotHistoryLength: number;
  // functionality to postMessage the selected snapshot index to background.js
  setSnapshotTimeTravelIndex: (index: number) => void;
}

const SnapshotsList: React.FC<SnapshotsListProps> = ({
  curRender,
  setCurRender,
  snapshotHistoryLength,
  setSnapshotTimeTravelIndex,
}) => {
  // array of individual snapshots with setCurRender and timeTravel functionality
  const listOfSnapshotsIndexes: JSX.Element[] = [];
  // iterate the same length of our snapshotHistory
  for (let i = 0; i < snapshotHistoryLength; i++) {
    listOfSnapshotsIndexes.push(
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
      </div>
    );
  }
  // render the array of snapshots divs generated above
  return <div className="SnapshotsList">{listOfSnapshotsIndexes}</div>;
};

export default SnapshotsList;
