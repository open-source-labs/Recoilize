// once chrome tab connects with our content-script
window.postMessage({ action: 'contentScriptStarted' });

// Listen to messages from Recoilize module within dev webpage
window.addEventListener('message', (msg) => {
  chrome.runtime.sendMessage(msg.data);
});

// listening for messages from the background script
chrome.runtime.onMessage.addListener((msg) => {
  // send the message to npm package
  const { action } = msg;
  switch (action) {
    case 'snapshotTimeTravel':
      console.log('we are sending snapshotTimeTravel message to module: ', msg);
      window.postMessage(msg);
      break;
  }
});
