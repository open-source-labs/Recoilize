// once chrome tab connects with our content-script
window.postMessage({action: 'contentScriptStarted'}, '*');

// Listen to messages from Recoilize module within dev webpage
window.addEventListener('message', msg => {
  chrome.runtime.sendMessage(msg.data);
});

// listening for messages from the background script
chrome.runtime.onMessage.addListener(msg => {
  // send the message to npm package
  const {action} = msg;
  switch (action) {
    case 'snapshotTimeTravel':
      window.postMessage(msg, '*');
      break;
    case 'persistState':
      window.postMessage(msg, '*');
      break;
    case 'throttleEdit':
      window.postMessage(msg, '*');
      break;
    case 'mouseover':
      window.console.log('msg received content script')
      window.postMessage(msg, '*')
      break;
  }
});
