import React, {useContext} from 'react';
import SnapshotsList from '../components/SnapshotList/SnapshotList';

import {filter} from '../components/App';
import {stateSnapshot, selectedTypes, stateSnapshotDiff} from '../../types';

interface SnapshotsContainerProps {
  // length of snapshotHistory array
  snapshotHistoryLength: number;
}

const SnapshotsContainer: React.FC<SnapshotsContainerProps> = ({
  snapshotHistoryLength,
}) => {
  //indexDiff is used to ensure the index of filter matches the index of the snapshots array in the backend
  let indexDiff: number = 0;
  if (filter[0] && filter[0].indexDiff) {
    indexDiff = filter[0].indexDiff;
  }

  // functionality to postMessage the selected snapshot index to background.js
  const timeTravelFunc = (index: number) => {
    // variable to store/reference connection
    const backgroundConnection = chrome.runtime.connect();
    //const test = chrome.extension.getBackgroundPage();
    // post the message with index in payload to the connection
    backgroundConnection.postMessage({
      action: 'snapshotTimeTravel',
      tabId: chrome.devtools.inspectedWindow.tabId,
      payload: {
        snapshotIndex: index + indexDiff,
      },
    });
  };
  return (
    <div className="SnapshotsContainer">
      <span
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '10px',
          marginBottom: '10px',
        }}>
        Snapshots
      </span>
      <SnapshotsList
        snapshotHistoryLength={snapshotHistoryLength}
        timeTravelFunc={timeTravelFunc}
      />
    </div>
  );
};

export default SnapshotsContainer;
