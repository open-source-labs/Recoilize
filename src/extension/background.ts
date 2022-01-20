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

// once background-script start, start with cleared connections
const connections: Connections = {};

// once background starts, start with cleared local storage
// this only happens when we open chrome again, not on refresh
chrome.storage.local.clear(function (): void {
  chrome.storage.local.get(null, function (result): void {});
});

// LISTEN for initial connection from dev tool
// runs when devtool is connected
chrome.runtime.onConnect.addListener(port => {
  const devToolsListener = (msg: Msg, port: object) => {
    const {tabId, action} = msg;

    switch (action) {
      case 'devToolInitialized':
        connections[tabId] = port;
        // read and send back to dev tool current local storage for corresponding tabId & port
        chrome.storage.local.get(null, function (result) {
          connections[tabId].postMessage({
            action: 'recordSnapshot',
            payload: result[tabId],
          });
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

  // Grabs tab id from content script and converts it to a string
  const tabId = `${sender.tab.id}`;

  const {action} = msg;

  switch (action) {
    // Listens to new snapshots (state changes) from module, stores in local storage and sends to dev tool if port is opened
    case 'recordSnapshot':
      // Next snapshot from the msg payload
      const snapshot = msg.payload;

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

    // If the module is loaded for first time or refreshed reset snapshot History and send initial payload
    case 'moduleInitialized':
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
