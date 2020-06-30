import React, { useState, useEffect } from "react";
import SnapshotsContainer from "./SnapshotsContainer";
import VisualContainer from "./VisualContainer";

// wraps entire application
const MainContainer = ({ snapshots }) => {
  // useState hook to update the index of snapshots to compare in Diff.jsx
  const [curRender, setCurRender] = useState(snapshots.length - 1);

  useEffect(() => {
    setCurRender(snapshots.length - 1);
  }, [snapshots]);

  return (
    <div className="MainContainer">
      <SnapshotsContainer
        // array of snapshots
        snapshots={snapshots}
        // setState functionality to update curRender
        setCurRender={setCurRender}
      />
      <VisualContainer
        // array of snapshots
        snapshots={snapshots}
        // snapshot at index [curRender -1]
        oldSnap={snapshots[curRender - 1]}
        // snapshot at index [curRender]
        newSnap={snapshots[curRender]}
      />
    </div>
  );
};

export default MainContainer;
