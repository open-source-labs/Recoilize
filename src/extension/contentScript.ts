/* 
R4 - A content script is a program that runs for any given webpage that
the browser is currently, and *more importantly* will run WHEN the webpage LOADS
*/

/* 
R4 - According to Google Developer Docs: Although the execution environments 
of content scripts and the pages that host them are isolated from each other, 
they share access to the page's DOM. If the page wishes to communicate with 
the content script, or with the extension via the content script, 
it must do so through the shared DOM. An example can be accomplished using window.postMessage:
*/

// R4 - the following line sends a message to the window
// and it is picked up in the window by the RecoilizeDebugger Component
window.postMessage(
  {
    action: 'contentScriptStarted',
    payload: null,
    origininatedFrom: 'contentScript',
    intendedRecipient: 'RecoilizeDebugger',
  },
  '*',
);

// Set up event listener to receive messages from the Recoilize module running in the webpage being debugged
window.addEventListener('message', msg => {
  // deconstruct values from message received
  const {action, payload, origininatedFrom, intendedRecipient} = msg.data;

  // Check for specific message actions: moduleInitialized, persistSnapshots, recordSnapshot...
  // To ensure backward compatibility, we chose to block by actions instead of sender/receiver (which would be ideal)
  if (
    action !== 'moduleInitialized' &&
    action !== 'persistSnapshots' &&
    action !== 'recordSnapshot'
  ) {
    // return out of the functionif the actions are not in the list above
    return;
  }

  // create an object with the properties received in the message
  const messageReceived = {
    action,
    payload,
    origininatedFrom,
    intendedRecipient,
  };

  // create a structured clone to remove any intended messages from other sites
  const messageToSend = structuredClone(messageReceived);

  // console log to test the logic of this function
  console.log(
    'this is messge being relayed by the content script',
    messageToSend,
  );

  chrome.runtime.sendMessage(messageToSend);
});

// listening for messages from the background script AKA service_worker
chrome.runtime.onMessage.addListener(msg => {
  // R4 - deconstruct msg.action from the msg object into a variable with the name of action.
  const {action} = msg;
  // R4 -  use a switch statement to determine what action to take based on the value of "action".
  switch (action) {
    case 'snapshotTimeTravel':
      // R4 -  the window.postMessage() sends a message to the page's window object.
      // R4 -  in this specific case, the Recoilize Debugger Module in the webpage (NPM package) is the intended recipient
      window.postMessage(msg, '*');
      break;
    case 'persistState':
      // R4 - the window.postMessage() sends a message to the page's window object.
      // R4 - in this specific case, the Recoilize Debugger Module in the webpage (NPM package) is the intended recipient
      window.postMessage(msg, '*');
      break;
    case 'throttleEdit':
      // R4 - the window.postMessage() sends a message to the page's window object.
      // R4 - in this specific case, the Recoilize Debugger Module in the webpage (NPM package) is the intended recipient
      window.postMessage(msg, '*');
      break;
  }
});
