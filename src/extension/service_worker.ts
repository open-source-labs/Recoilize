// TO CONSOLE LOG IN THIS FILE, we need to go to chrome://extensions/ and click inspect on the actual devTOOL!

// Message Interface
interface Msg {
  action: string;
  tabId?: string;
  payload?: object;
  test?: number;
}

interface Connections {
  [tabId: string]: any;
}

// once service_worker (previously known as background script) start, start with cleared connections
const connections: Connections = {};

// once service_worker (previously known as background script) starts, start with cleared local storage
// this only happens when we open chrome again, not on refresh
chrome.storage.local.clear(function (): void {
  chrome.storage.local.get(null, function (result): void {});
});

// RUNS when devtool is connected
// LISTEN for initial connection from dev tool
chrome.runtime.onConnect.addListener(port => {
  /*
  PORT represents a communication channel between different parts of a Chrome extension, 
  such as between a content script and a service_worker script or between a popup and a service_worker. 
  The Port object provides methods for sending and receiving messages over the connection.
  */

  const devToolsListener = (msg: Msg, port: object) => {
    // deconstruct tabId and action from msg
    const {tabId, action} = msg;

    // console.log to print the message object and the port to the service_worker console in chrome
    console.log(
      'log: in the onConnect IN service_worker.ts',
      `message: ${msg}`,
      `port: ${port}`,
    );

    switch (action) {
      case 'devToolInitialized':
        // assigns an object connection a property with a key of msg[tabId] and a value of the PORT
        connections[tabId] = port;
        // read and send back to dev tool current local storage for corresponding tabId & port
        console.log('local chrome storage: ', chrome.storage.local);
        chrome.storage.local.get(null, function (result) {
          console.log('chrome.storage.local.get result: ', result);
          // Use the PORTs postMessage method to send an action and a payload
          connections[tabId].postMessage({
            action: 'recordSnapshot',
            // payload is an array of objects
            // payload element example: {atomsAndSelectors, componentAtomTree, filteredSnapshot, indexDiff:}

            // r4- result is the argument passed into the  callback function invoked after chrome.storage.local.get
            // has completed executing as Chrome returns the data to you via an argument to that function.
            payload: result[tabId],
          });
          // uncomment the lines below to log into the service_worker console in chrome
          console.log('connections tabId: ', connections[tabId]);
          console.log('connections: ', connections);
          console.log('tabId: ', tabId);
        });
        break;

      case 'snapshotTimeTravel':
        if (tabId) {
          // if msg tabId provided, send time travel snapshot history to content-script
          chrome.tabs.sendMessage(Number(tabId), msg);
        }
        break;

      case 'mouseover':
        if (tabId) {
          chrome.tabs.sendMessage(Number(tabId), msg);
        }
        break;

      case 'persistState':
        if (tabId) {
          // if msg tabId provided, send persistState command to content-script
          chrome.tabs.sendMessage(Number(tabId), msg);
        }
        break;
      case 'throttleEdit':
        if (tabId) {
          console.log('doing a throttle edit');
          chrome.tabs.sendMessage(Number(tabId), msg);
        }
        // window.postMessage({action: 'throttleChange'}, throttler);
        break;

      default:
        break;
    }
  };

  // BEGINS listening to messages from port
  port.onMessage.addListener(devToolsListener);

  // ENDS listening to messages from port
  port.onDisconnect.addListener(port => {
    // Removes listener
    port.onMessage.removeListener(devToolsListener);

    // Removes reference to devtool instance when the devtool is closed
    for (const prop in connections) {
      if (connections[prop] === port) {
        delete connections[prop];
        break;
      }
    }
  });
});

// Listens to message from the Recoilize module
chrome.runtime.onMessage.addListener((msg, sender) => {
  // Error handling if there isn't a proper tabId
  if (!sender.tab) return;

  // r4 - this is a test to filer out messages without a payload
  if (!msg.payload) return;

  //
  // r4 - the following code will check to see if a payload object exists in the message.
  // if the object doesn't exist return out of the function.
  // this is howevewer a temporary fix and and more permanent fix will need to be implemented by adding a
  // property to the RecoilizeDebugger in the module in the npm store
  //

  console.log('service_worker.ts chromeruntime msg: ', msg);

  // Grabs tab id from content script and converts it to a string
  const tabId = `${sender.tab.id}`;

  const {action} = msg;

  switch (action) {
    // Listens to new snapshots (state changes) from module, stores in local storage and sends to dev tool if port is opened
    case 'recordSnapshot':
      //console.log('chrome.runtime.onMessage with case: recordSnapshot');

      // Next snapshot from the msg payload
      const snapshot = msg.payload;
      //console.log('snapshot: ', snapshot);

      // Get current snapshot history from local storage
      chrome.storage.local.get([tabId], function (result) {
        // Grab the current snapshot history from local storage
        const tabIdSnapshotHistory = result[tabId] ? [...result[tabId]] : [];

        // Grab the last (most recent) snapshot from the history
        const lastSnapshot =
          tabIdSnapshotHistory.length > 0
            ? tabIdSnapshotHistory[tabIdSnapshotHistory.length - 1]
            : {};

        // Merge the changed atoms from the new state with the old state
        // the old state should have the list of ALL atoms, not just the ones that changed, so we want to preserve a list of all atoms.
        tabIdSnapshotHistory.push(Object.assign({}, lastSnapshot, snapshot));

        // Set local storage with updated snapshotHistory
        chrome.storage.local.set({[tabId]: tabIdSnapshotHistory}, function () {
          // ONLY if there is a port connection with the current tabId
          if (connections[tabId]) {
            // Send to dev tool

            connections[tabId].postMessage({
              action: 'recordSnapshot',
              payload: tabIdSnapshotHistory,
            });
          }
        });
      });
      break;

    // const devToolData = createDevToolDataObject(
    //   initialFilteredSnapshot,
    //   indexDiff,
    //   atomsAndSelectorsMsg,
    //   selectorsObject,
    // );

    // If the module is loaded for first time or refreshed reset snapshot History and send initial payload
    case 'moduleInitialized':
      //console.log('module has been initialized IN BG SCRIPT', msg);
      const tabIdSnapshotHistory = [msg.payload];
      // set tabId within local storage to initial snapshot sent from module
      chrome.storage.local.set({[tabId]: tabIdSnapshotHistory}, function () {
        // if tabId is has opened dev tool port, send snapshotHistory to dev tool.
        if (connections[tabId]) {
          connections[tabId].postMessage({
            action: 'recordSnapshot',
            payload: tabIdSnapshotHistory,
          });
        }
      });
      break;
    case 'persistSnapshots':
      // getting the array of filtered snapshots that exists on locoal storage
      chrome.storage.local.get(tabId, function (result) {
        connections[tabId].postMessage({
          action: 'recordSnapshot',
          payload: result[tabId],
        });
      });

    default:
      break;
  }
});

// when the tab is closed reset local storage for that specific tabId
chrome.tabs.onRemoved.addListener(tabId => {
  // we should only do this when tab closes not when port closes.
  chrome.storage.local.remove([`${tabId}`], function () {
    chrome.storage.local.get(null, function (result) {});
  });
});
