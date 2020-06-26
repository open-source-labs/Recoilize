import React from 'react';
import SnapshotsList from '../components/SnapshotsList';

// wraps SnapshotList
const SnapshotsContainer = ({snapshots, setCurRender}) => {
  return (
    <div className="SnapshotsContainer">
      <h3>Snapshots</h3>
      <SnapshotsList snapshots={snapshots} setCurRender={setCurRender} />
    </div>
  );
};

export default SnapshotsContainer;
