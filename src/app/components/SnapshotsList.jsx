// renders a list of all of the snapshots that were taking
import React from 'react';

const SnapshotsList = ({snapshots, setCurRender}) => {
  // this is where we grab snapshots using one of recoil's hooks and paste in an array
  const listOfSnapshots = snapshots.slice(1).reduce((acc, curSnap, i) => {
    // push list item into acc that passed setState functionality into button
    acc.push(
      <div
        className="individualSnapshot"
        key={curSnap.name}
        onClick={() => {
          setCurRender(curSnap.index);
        }}>
        <li>{curSnap.name}</li>
      </div>,
    );
    return acc;
  }, []);
  return <div className="SnapshotsList">{listOfSnapshots}</div>;
};

export default SnapshotsList;
