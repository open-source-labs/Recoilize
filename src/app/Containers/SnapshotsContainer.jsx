import React from 'react';
import SnapshotsList from '../components/SnapshotsList';

const SnapshotsContainer = ({ snapshots, setCurRender }) => {
  // wraps SnapshotList
  return (
    <div className='SnapshotsContainer'>
      <h3>Snapshots</h3>
      <SnapshotsList snapshots={snapshots} setCurRender={setCurRender} />
    </div>
  );
};

export default SnapshotsContainer;
