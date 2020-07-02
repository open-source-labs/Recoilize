import React, { useState, useEffect } from 'react';
import MainContainer from '../Containers/MainContainer';

const LOGO_URL = `https://public.bl.files.1drv.com/y4mFC_icIYGiJ2zg4zuUUlrZjGfCu6KwMsjC0Ik0TTaWOxfQ6fdrSbp-KAlqXN-xEvJz_eoYwbqk99pbLNYJsgF0zWR78SXorrfzZ6FwlwxE_E2LattKf92A_63IpKV7LrxK6ajTihA4jMoUb_0g1UbV6M2kfNCIBPCgLS_790mZgWpXp1A2KhGLkkq_UxFX3XBlxVDVTD3lPtefbfhZAD6QW9wIQWlnwwcJVitU9itn24?access_token=EwDwAq1DBAAUzl/nWKUlBg14ZGcybuC4/OHFdfEAAY08AkuWBBUZDe/Sb4ypiAuxFNBnJRT4mw/zktTaSv86GXEcq8XWN4Y467p4%2bwwW%2bB/d2ZYsRsVrNYLVCctgS0sI9LAu5IEHLlFVl/8ChD/1S4JeVeEmrug5qJdAOHcWeBBZID9Ym97lrYio7pBpS06xVBPHLCgVE3nRnRmavzo83pnz61G4jRWagEgPyR2l5Kkrqi2Q0vB6km1j2SrL2BFLU0XuAhWaLIuG6xjrCO46R2k8VxcLC35cSJorlhRK%2bFTpWkv418a3gC6E/3r089dbWCWE3YpapZJnAByBGijgDiy/haXOtWd0/Fz2b/nAnV7L8U8upUVmGU%2btF5Kfu0oDZgAACKMcCrzcFHcqwAEf2BzhuSyDaIxZwTD95O6RokANWN0qCBjKPvVlMB4tuFoJe9m/DKYlq%2boHaJjl9ZTvG8%2blLe2Y2NvSlA0YEA%2bUg5iuKkRlUHEp2smSmdS0lOjOtO1EqzQVkIPfn5a7yZu%2bB0Za4h2SIHpp/awM3KCcDG6NYXBBN33MGphoRHIp7vuTqDnVMcJ/H8O7egZ3KO0rywE8cfYAyDossD0dOO6QchN5qlUrkLmyv5Ffrkr7e%2bXDnRR46brDiNjVsHox1IEMg%2bhs4A2pmZTJjN8JAKz2By4MDKlXTRbipauiCaH5sECSOujJyzt3lTfi46Xb%2bv6166nqa1KkiaviWERkS1eaDkvmtGr0CcoDIupJLGsiH0a/uUj4/KE6Ms1NJk1rw8iX0FC700MtOIhcF9xTM2f7Ifg9cnqOypkGp4atRYxE6ut99lcqXwDR8rp5j7tst1C/%2b1v81OzM7J%2bA2pJ3pADghILwAGaBJ5/Ift2011oTKsl1A1Towl2k6TlooDA9kmIhxECu64eYTpBa4l9WkuqMuDeSvqUAK9/9e1LsFoegtZ/ABYlEPUzW2obvODQj6E7zuSvHT67rWeODku83e5XpBQI%3d`;

function App() {
  const [snapshotHistory, setSnapshotHistory] = useState([]);

  useEffect(() => {
    // SETUP connection to bg script
    const backgroundConnection = chrome.runtime.connect();
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
        snapshotHistory={snapshotHistory}
      />
    );
  };

  // Render module not found message if snapHistory is null, this means we have not detected a recoil app with recoilize module installed properly
  const renderModuleNotFoundContainer = () => {
    return (
      <div className='notFoundContainer'>
        <img className='logo' src={LOGO_URL} />
        <p>
          Supported only with Recoil apps with the Recoilize NPM module. Follow
          the installation instructions at www.recoilize.com.
        </p>
      </div>
    );
  };

  return (
    <div className='App'>
      {snapshotHistory
        ? renderMainContainer()
        : renderModuleNotFoundContainer()}
    </div>
  );
}

export default App;
