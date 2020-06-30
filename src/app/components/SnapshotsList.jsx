// renders a list of all of the snapshots that were taking
import React from 'react';

const SnapshotsList = ({curRender, setCurRender, snapshots}) => {
  // this is where we grab snapshots using one of recoil's hooks and paste in an array
  const listOfSnapshots = snapshots.reduce((acc, curSnap, i) => {
    // push list item into acc that passed setState functionality into button
    acc.push(
      <button
        className="individualSnapshot"
        key={i}
        onClick={() => {
          setCurRender(i);
        }}>
        <li>{i}</li>
      </button>,
    );
    return acc;
  }, []);
  return <div className="SnapshotsList">{listOfSnapshots}</div>;
};

export default SnapshotsList;
