import React, {useState, useEffect} from 'react';
import SnapshotsContainer from './SnapshotsContainer';
import VisualContainer from './VisualContainer';

// wraps entire application
const MainContainer = ({snapshots}) => {

  const [curRender, setCurRender] = useState(snapshots.length - 1);

  useEffect(() => {
    setCurRender(snapshots.length - 1);
  }, [snapshots]);

  return (
    <div className="MainContainer">
      <SnapshotsContainer
        curRender={curRender}
        setCurRender={setCurRender}
        snapshots={snapshots}
      />
      <VisualContainer
        snapshots={snapshots}
        oldSnap={snapshots[curRender - 1]}
        newSnap={snapshots[curRender]}
      />
    </div>
  );
};

export default MainContainer;
