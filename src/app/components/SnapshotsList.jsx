// renders a list of all of the snapshots that were taking
import React from 'react';

const SnapshotsList = ({
  curRender,
  setCurRender,
  snapshotHistory,
  setSnapshotTimeTravelIndex,
}) => {
  // array of individual snapshots with setCurRender and timeTravel functionality
  const listOfSnapshots = snapshotHistory.reduce((acc, curSnap, i) => {
    acc.push(
      <div
        className='individualSnapshot'
        key={i}
        // setState functionality to update curRender
        onClick={() => {
          setCurRender(i);
        }}
      >
        <li>{i}</li>
        <button
          className='timeTravelButton'
          onClick={() => {
            // invoke setSnapshotTimeTravelIndex with the snapshot index in the args
            setSnapshotTimeTravelIndex(i);
          }}
        >
          Time Travel
        </button>
      </div>
    );
    return acc;
  }, []);
  return <div className='SnapshotsList'>{listOfSnapshots}</div>;
};

export default SnapshotsList;
