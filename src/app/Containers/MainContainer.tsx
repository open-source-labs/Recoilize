import React from 'react';
import SnapshotsContainer from './SnapshotContainer';
import VisualContainer from './VisualContainer';

const MainContainer: React.FC = () => {
  return (
    <div className="MainContainer">
      <SnapshotsContainer />
      <VisualContainer />
    </div>
  );
};

export default MainContainer;
