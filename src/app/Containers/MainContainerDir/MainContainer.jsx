import React, { useState, useEffect } from 'react';
import SnapshotsContainer from '../SnapshotContainerDir/SnapshotsContainer.jsx';
import VisualContainer from '../VisualContainerDir/VisualContainer.jsx';

// wraps entire application
const MainContainer = ({ snapshotHistory }) => {
  // useState hook to update the index of snapshotHistory to compare in Diff.jsx
  const [curRender, setCurRender] = useState(snapshotHistory.length - 1);

  useEffect(() => {
    setCurRender(snapshotHistory.length - 1);
  }, [snapshotHistory]);

  return (
    <div className='MainContainer'>
      <SnapshotsContainer
        // index of current snapshot rendered in devtool
        curRender={curRender}
        // array of snapshotHistory
        snapshotHistory={snapshotHistory}
        // setState functionality to update curRender
        setCurRender={setCurRender}
      />
      <VisualContainer
        // array of snapshotHistory
        snapshotHistory={snapshotHistory}
        // snapshot at index [curRender -1]
        oldSnap={snapshotHistory[curRender - 1]}
        // snapshot at index [curRender]
        newSnap={snapshotHistory[curRender]}
      />
    </div>
  );
};

export default MainContainer;
