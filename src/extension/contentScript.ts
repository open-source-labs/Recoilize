/* 
R4 - According to Google Developer Docs: Although the execution environments 
of content scripts and the pages that host them are isolated from each other, 
they share access to the page's DOM. If the page wishes to communicate with 
the content script, or with the extension via the content script, 
it must do so through the shared DOM. An example can be accomplished using window.postMessage:
*/

// R4 - the following line sends a message to the window
// and it is picked up in the window by the RecoilizeDebugger Component
// once chrome tab connects with the content-script
window.postMessage({action: 'contentScriptStarted'}, '*');
//console.log('content script sending action to the window IN CONTENT SCRIPT');

// Listen to messages from Recoilize module within dev webpage
window.addEventListener('message', msg => {
  console.log('contentScript.ts received the following message: ', msg.data);
  chrome.runtime.sendMessage(msg.data);
});

// listening for messages from the background script AKA service_worker
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
