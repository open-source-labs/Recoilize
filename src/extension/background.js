/////////////////////////////////////////////.
/////// unsure on when this gets invoked /////
//////////////////////////////////////////////\

// chrome.runtime.onConnect.addListener(function (devToolsConnection) {
//   // assign the listener function to a variable to allow removal in the future
//   const devToolsListener = (message, sender, sendResponse) => {
//     // Inject a content script into the identified tab
//     console.log(message);
//     chrome.tabs.executeScript(message.tabId,
//       { file: '../app/index.js' });
//   }

//   // add the listener
//   devToolsConnection.onMessage.addListener(devToolsListener);

//   // remove the listener
//   devToolsConnection.onDisconnect.addListener(() => {
//     devToolsConnection.onMessage.removeListener(devToolsListener);
//   });
// })