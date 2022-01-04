import React from 'react';
import SnapshotsContainer from './SnapshotContainer';
import VisualContainer from './VisualContainer';
import TravelContainer from './TravelContainer';

const MainContainer: React.FC = () => {
  return (
    <div className="MainContainer">
      <TravelContainer />
      <SnapshotsContainer />
      <VisualContainer />
    </div>
  );
};

export default MainContainer;
