import React from 'react';
import SnapshotsContainer from './SnapshotContainer';
import VisualContainer from './VisualContainer';

// wraps entire application
const MainContainer: React.FC = () => {
  // render containers passing necessary props
  return (
    <div className="MainContainer">
      <SnapshotsContainer />
      <VisualContainer />
    </div>
  );
};

export default MainContainer;
