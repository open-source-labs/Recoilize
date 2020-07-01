import React, { useState, useEffect } from 'react';
import MainContainer from '../Containers/MainContainer';

const LOGO_URL = 'https://qv7zda.bl.files.1drv.com/y4pJcCvhYCZvfPcG6U2qdGZKhwllRCJvQk6z1L-zbgkjShAOfOfMGJUtogwnYwutjqIgWOkDHrSWM93rs5UeEdzSuI7qM_PjBjGGZneuUgguzBk50aXWt2z4m4xOO8y2plDiu9cLLLmYDf3uYsuAUQHDuhypvDDlp0fsYsvy1M0lVwwHt3lqul_h-UXjkzVMMnLCHFUkeSGwLnWp6aBVL9oU5S_XooGyVS2MuUf1WolE9I/Recoilize.png?psid=1'

function App() {
  const [snapshotHistory, setSnapshotHistory] = useState([]);

  useEffect(() => {
    // SETUP connection to bg script
    const backgroundConnection = chrome.runtime.connect();

    console.log('backgroundConnection: ', backgroundConnection)
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

  // Render main container if we have detected a recoil app with the recoilize module passing data
  const renderMainContainer = () => {
    return (
      <MainContainer
        className='mainContainer'
        // array of snapshots
        snapshots={snapshotHistory}
      />
    )
  }

  // Render module not found message if snapHistory is null, this means we have not detected a recoil app with recoilize module installed properly
  const renderModuleNotFoundContainer = () => {
    return (
      <div className='notFoundContainer'><img className='logo' src={LOGO_URL} /><p>Supported only with Recoil apps with the Recoilize NPM module. Follow the installation instructions at www.recoilize.com.</p></div>
    )
  }

  return (
    <div className='App'>
      {snapshotHistory ? renderMainContainer() : renderModuleNotFoundContainer()}
    </div>
  );
}

export default App;
