// renders a list of all of the snapshots that were taking
import React from 'react';

const SnapshotsList = ({ curRender, setCurRender, snapshotHistory, setSnapshotTimeTravelIndex }) => {
  // this is where we grab snapshots using one of recoil's hooks and paste in an array
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
        <li>{i} <button onClick= {() => {
          console.log(`Time Travel to ${i}`);
          setSnapshotTimeTravelIndex(i);
          }}>Time Travel</button></li>
      </div>
    );
    return acc;
  }, []);
  return <div className='SnapshotsList'>{listOfSnapshots}</div>;
};

export default SnapshotsList;
