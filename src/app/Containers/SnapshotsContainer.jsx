import React from 'react';
import SnapshotsList from '../components/SnapshotsList';

const SnapshotsContainer = ({ snapshotHistory, setCurRender }) => {
  // function will post message to background.js
  const setSnapshotTimeTravelIndex = (index) => {
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    // post the message to the connection
    backgroundConnection.postMessage({
      action: 'snapshotTimeTravel',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: { snapshotIndex: index },
    });
  };
  return (
    <div className='SnapshotsContainer'>
      <h3>Snapshots</h3>
      <SnapshotsList
        // array of snapshots
        snapshotHistory={snapshotHistory}
        // setState functionality to update curRender
        setCurRender={setCurRender}
        // functionality to postMessage the selected snapshot index
        setSnapshotTimeTravelIndex={setSnapshotTimeTravelIndex}
      />
    </div>
  );
};

export default SnapshotsContainer;
