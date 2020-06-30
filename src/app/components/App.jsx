import React, { useState, useEffect } from 'react';
import MainContainer from '../Containers/MainContainer';

function App() {
  const [snapshotHistory, setSnapshotHistory] = useState([]);

  useEffect(() => {
    // SETUP connection to bg script
    const backgroundConnection = chrome.runtime.connect({
      name: 'panel',
    });
    // INITIALIZE connection to bg script
    backgroundConnection.postMessage({
      action: 'devToolInitialized',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    // LISTEN for messages FROM bg script
    backgroundConnection.onMessage.addListener((msg) => {
      if (msg.action === 'recordSnapshot') {
        setSnapshotHistory(msg.payload);
      }
    });
  }, []);

  return (
    <div className='App'>
      <MainContainer
        className='mainContainer'
        // array of snapshots
        snapshots={snapshotHistory}
      />
    </div>
  );
}

export default App;
