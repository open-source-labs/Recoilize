// once chrome tab connects with our content-script
window.postMessage({action: 'contentScriptStarted'}, '*');
console.log('content script sending action to the window IN CONTENT SCRIPT');

// Listen to messages from Recoilize module within dev webpage
window.addEventListener('message', msg => {
  console.log('contentScript message: ', msg);
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
  }
});
