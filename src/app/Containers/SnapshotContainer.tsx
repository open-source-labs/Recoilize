import React, {useContext} from 'react';
import SnapshotsList from '../components/SnapshotList/SnapshotList';
import {renderIndexContext} from './MainContainer';
import {filterContext} from '../components/App';

const SnapshotsContainer: React.FC = () => {
  const {renderIndex} = useContext(renderIndexContext);
  const {filter} = useContext(filterContext);
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

  function prevClr() {
    const snapshotListArr = document.querySelectorAll('.individualSnapshot');
    for (let i = 0; i < snapshotListArr.length; i++) {
      let index = parseInt(snapshotListArr[i].id.match(/\d+/g)[0]);

      if (index < renderIndex) {
        snapshotListArr[i].parentNode.removeChild(snapshotListArr[i]);
      } else break;
    }
  }

  function fwrdClr() {
    const snapshotListArr = document.querySelectorAll('.individualSnapshot');

    for (let i = snapshotListArr.length - 1; i >= 0; i--) {
      let index = parseInt(snapshotListArr[i].id.match(/\d+/g)[0]);

      if (index > renderIndex) {
        snapshotListArr[i].parentNode.removeChild(snapshotListArr[i]);
      } else break;
    }
  }

  return (
    <div className="SnapshotsContainer">
      <div id="clear-snapshots-title">Clear Snapshots</div>
      <div className="clear-buttons">
        <button onClick={prevClr} id="prevClr">
          Previous
        </button>
        <button onClick={fwrdClr} id="fwrdClr">
          Forward
        </button>
      </div>
      <span
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '10px',
          marginBottom: '10px',
        }}>
        Snapshots
      </span>
      <SnapshotsList timeTravelFunc={timeTravelFunc} />
    </div>
  );
};

export default SnapshotsContainer;
