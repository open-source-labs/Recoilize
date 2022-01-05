import React from 'react';
import SnapshotsContainer from './SnapshotContainer';
import VisualContainer from './VisualContainer';
import TravelContainer from './TravelContainer';

const MainContainer: React.FC = () => {
  return (
    <div className="MainContainer">
      <SnapshotsContainer />
      <VisualContainer />
      <TravelContainer />
    </div>
  );
};

export default MainContainer;
