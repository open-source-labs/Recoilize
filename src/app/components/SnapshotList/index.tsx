// renders a list of all of the snapshots that were taking
import React from 'react';
import { stateSnapshot } from '../../../types';

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
            ? { color: '#E6E6E6', backgroundColor: '#212121' }
            : { color: '#989898' }
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
          Time Travel
        </button>
      </div>
    );
  }
  // render the array of snapshots divs generated above
  return <div className="SnapshotsList">{snapshotDivs}</div>;
};

export default SnapshotsList;
