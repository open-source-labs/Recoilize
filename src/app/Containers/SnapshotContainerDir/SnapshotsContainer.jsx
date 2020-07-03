import React from 'react';
import SnapshotsList from '../../components/SnapshotListDir/SnapshotsList.jsx';
import PropTypes from 'prop-types';

const SnapshotsContainer = ({ curRender, snapshotHistory, setCurRender }) => {
  // function will post message to background.js
  const setSnapshotTimeTravelIndex = (index) => {
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'snapshotTimeTravel',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: { snapshotIndex: index },
    });
  };
  return (
    <div className="SnapshotsContainer">
      <h3>Snapshots</h3>
      <SnapshotsList
        curRender={curRender}
        snapshotHistory={snapshotHistory}
        setCurRender={setCurRender}
        // functionality to postMessage the selected snapshot index to background.js
        setSnapshotTimeTravelIndex={setSnapshotTimeTravelIndex}
      />
    </div>
  );
};

SnapshotsContainer.propTypes = {
  // index of current snapshot rendered in devtool
  curRender: PropTypes.number.isRequired,
  // array of object snapshots of user's state
  snapshotHistory: PropTypes.arrayOf(PropTypes.object),
  // setState functionality to update curRender
  setCurRender: PropTypes.func.isRequired,
};

export default SnapshotsContainer;
