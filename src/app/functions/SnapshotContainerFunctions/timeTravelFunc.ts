// functionality to post the selected snapshot index to background.js

const timeTravelFunc = (index: number, filterData) => {
  // indexDiff is used to ensure the index of filter matches the index of the snapshots array in the backend
  let indexDiff: number = 0;
  if (filterData[0] && filterData[0].indexDiff) {
    indexDiff = filterData[0].indexDiff;
  }
  
  // variable to store/ reference connection
  const backgroundConnection = chrome.runtime.connect();
  // post the message with index in payload to the connection
  backgroundConnection.postMessage({
    action: 'snapshotTimeTravel',
    tabId: chrome.devtools.inspectedWindow.tabId,
    payload: {
      snapshotIndex: index + indexDiff,
    },
  });
}

export default timeTravelFunc;