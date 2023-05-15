/* 
Comment by R4 team - A content script is a program that runs for any given webpage that
the browser is currently, and *more importantly* will run when the webpage loads
*/

/* 
Comment by R4 team - According to Google Developer Docs: Although the execution environments 
of content scripts and the pages that host them are isolated from each other, 
they share access to the page's DOM. If the page wishes to communicate with 
the content script, or with the extension via the content script, 
it must do so through the shared DOM. An example can be accomplished using window.postMessage:
*/

// Comment by from R4 team - the following line sends a message to the window
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

  // Check for the specific message actions: moduleInitialized, persistSnapshots, recordSnapshot...
  // To ensure backward compatibility with the RecoilizeDebugger, we chose to block by actions instead of sender/receiver (which would be ideal)
  if (
    action !== 'moduleInitialized' &&
    action !== 'persistSnapshots' &&
    action !== 'recordSnapshot'
  ) {
    // return out of the functionif the actions are not in the list above
    return;
  }

  // create an object with the properties received in the message to remove any unintended properties from other sites
  const messageReceived = {
    action,
    payload,
    origininatedFrom,
    intendedRecipient,
  };

  // create a structured
  const messageToSend = structuredClone(messageReceived);

  // uncomment the following lines log to test the logic of this function by printing the message to send object
  // console.log(
  //   'this is message being relayed by the content script',
  //   messageToSend,
  // );

  chrome.runtime.sendMessage(messageToSend);
});

// listening for messages from the service_worker --previously called the background script
chrome.runtime.onMessage.addListener(msg => {
  // Comment by from R4 team - deconstruct msg.action from the msg object into a variable with the name of action.
  const {action} = msg;
  // Comment by from R4 team -  use a switch statement to determine what action to take based on the value of "action".
  switch (action) {
    case 'snapshotTimeTravel':
      // Comment by from R4 team -  the window.postMessage() sends a message to the page's window object.
      // Comment by from R4 team -  in this  case, theRecoilize Debugger Module in the webpage is the intended recipient
      window.postMessage(msg, '*');
      break;
    case 'throttleEdit':
      // Comment by from R4 team - the window.postMessage() sends a message to the page's window object.
      // Comment by from R4 team - in this  case, the RecoilizeDebugger Module in the webpage is the intended recipient
      window.postMessage(msg, '*');
      break;
  }
});
