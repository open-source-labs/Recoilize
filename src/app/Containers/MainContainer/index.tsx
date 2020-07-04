import React, { useState, useEffect } from 'react';
import SnapshotsContainer from '../SnapshotContainer';
import VisualContainer from '../VisualContainer';

interface MainContainerProps {
  snapshotHistory: object[];
}

// wraps entire application
const MainContainer: React.FC<MainContainerProps> = ({snapshotHistory}) => {
  // useState hook to update the index of snapshotHistory to compare in Diff.jsx
  const [curRender, setCurRender] = useState(snapshotHistory.length - 1);
  // useEffect for curRender
  useEffect(() => {
    setCurRender(snapshotHistory.length - 1);
  }, [snapshotHistory]);
  // render containers passing necessary props
  return (
    <div className="MainContainer">
      <SnapshotsContainer
        // index of current snapshot rendered in devtool
        curRender={curRender}
        // array of object snapshots of user's state
        snapshotHistory={snapshotHistory}
        // setState functionality to update curRender
        setCurRender={setCurRender}
      />
      <VisualContainer
        // snapshot at index [curRender -1]
        oldSnap={snapshotHistory[curRender - 1]}
        // snapshot at index [curRender]
        newSnap={snapshotHistory[curRender]}
      />
    </div>
  );
};

export default MainContainer;
