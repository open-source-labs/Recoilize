import React from "react";
import SnapshotsList from "../components/SnapshotsList";

const SnapshotsContainer = ({ snapshotHistory, setCurRender }) => {
  const setSnapshotTimeTravelIndex = (index) => {
    const backgroundConnection = chrome.runtime.connect();
    backgroundConnection.postMessage({
      action: "snapshotTimeTravel",
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: { snapshotIndex: index },
    });
  };
  return (
    <div className="SnapshotsContainer">
      <h3>Snapshots</h3>
      <SnapshotsList
        // array of snapshots
        snapshotHistory={snapshotHistory}
        // setState functionality to update curRender
        setCurRender={setCurRender}
        setSnapshotTimeTravelIndex={setSnapshotTimeTravelIndex}
      />
    </div>
  );
};

export default SnapshotsContainer;
