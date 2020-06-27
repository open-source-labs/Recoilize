import React, { useState, useEffect } from 'react';
import MainContainer from '../Containers/MainContainer';

function App() {
  useEffect(() => {
    // SETUP connection to bg script
    const backgroundConnection = chrome.runtime.connect({
      name: 'panel',
    });

    // INITIALIZE connection to bg script
    backgroundConnection.postMessage({
      name: 'hello',
    });

    // LISTEN for messages FROM bg script
    backgroundConnection.onMessage.addListener((msg) => {
      console.log('ON MESSAGE IN APP: ', msg);
    });
  });

  return (
    <div className='App'>
      <MainContainer className='mainContainer' />
    </div>
  );
}

export default App;
