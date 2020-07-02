// * DEBUGGING MESSAGES *
console.log('bg new');

// once background-script start, start with cleared connections
connections = {};

// once background starts, start with cleared local storage
chrome.storage.local.clear(function () {
  chrome.storage.local.get(null, function (result) {
    console.log('storage currently is ' + JSON.stringify(result));
  });
});

// LISTEN for initial connection from dev tool
chrome.runtime.onConnect.addListener((port) => {
  // * DEBUGGING MESSAGES *
  console.log(port, ' <-- do we know the port');

  const devToolsListener = (msg, port) => {
    // * DEBUGGING MESSAGES *
    console.log('in the devToolsListener');
    console.log('the msg: ', msg);

    const { tabId, action } = msg;

    switch (action) {
      case 'devToolInitialized':
        connections[tabId] = port;

        // * DEBUGGING MESSAGES *
        console.log(
          'port connect, these are the other current connections:',
          connections
        );

        // read and send back to dev tool current local storage for corresponding tabId & port
        chrome.storage.local.get(null, function (result) {
          connections[tabId].postMessage({
            action: 'recordSnapshot',
            payload: result[tabId],
          });
        });
        break;

      case 'snapshotTimeTravel':
        // * DEBUGGING MESSAGES *
        console.log(
          'snapshotTimeTravel request has been received from dev tool: ',
          msg
        );

        if (tabId) {
          // if msg tabId provided, send time travel snapshot history to content-script
          chrome.tabs.sendMessage(tabId, msg);
        } else {
          console.log('ERROR: no tabId was sent with this request');
        }
        break;

      default:
        break;
    }
  };

  // BEGINS listening to messages from port
  port.onMessage.addListener(devToolsListener);

  // ENDS listening to messages from port
  port.onDisconnect.addListener((port) => {
    // * DEBUGGING MESSAGE *
    console.log('the port is closing now');

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

  const { action } = msg;

  switch (action) {
    // Listens to new snapshots (state changes) from module, stores in local storage and sends to dev tool if port is opened
    case 'recordSnapshot':
      // Next snapshot from the msg payload
      const snapshot = msg.payload;

      // * DEBUGGING MESSAGES *
      chrome.storage.local.get(null, function (result) {
        console.log(
          'storage for whole local currently is ' + JSON.stringify(result)
        );
      });

      // Get current snapshot history from local storage
      chrome.storage.local.get([tabId], function (result) {
        // * DEBUGGING MESSAGES *
        console.log('storage for tabId currently is ' + JSON.stringify(result));

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
        chrome.storage.local.set(
          { [tabId]: tabIdSnapshotHistory },
          function () {
            console.log(
              'Local storage "snapshotHistory" is set to ' +
                tabIdSnapshotHistory
            );

            // ONLY if there is a port connection with the current tabId
            if (connections[tabId]) {
              console.log(
                `sending message to port ${tabId}. msg payload sent: `,
                msg.payload
              );

              // Send to dev tool
              connections[tabId].postMessage({
                action: 'recordSnapshot',
                payload: tabIdSnapshotHistory,
              });
            } else {
              // Error message if port does not exist
              console.log(
                `error: Tab, ${tabId}, not found in connection list: ${connections}`
              );
            }
          }
        );
      });
      break;

    // If the module is loaded for first time or refreshed reset snapshot History and send initial payload
    case 'moduleInitialized':
      const tabIdSnapshotHistory = [msg.payload];

      // set tabId within local storage to initial snapshot sent from module
      chrome.storage.local.set({ [tabId]: tabIdSnapshotHistory }, function () {
        console.log(
          'Local storage "snapshotHistory" is set to ' +
            JSON.stringify(tabIdSnapshotHistory)
        );

        // if tabId is has opened dev tool port, send snapshotHistory to dev tool.
        if (connections[tabId]) {
          console.log(
            `sending message to port ${tabId}. msg payload sent: `,
            JSON.stringify(tabIdSnapshotHistory)
          );
          connections[tabId].postMessage({
            action: 'recordSnapshot',
            payload: tabIdSnapshotHistory,
          });
        } else {
          // Tells content script that connection was not made
          console.log(
            `error: Tab, ${tabId}, not found in connection list: ${connections}`
          );
        }
      });
      break;

    default:
      break;
  }
});

// when the tab is closed reset local storage for that specific tabId
chrome.tabs.onRemoved.addListener(function (tabId) {
  console.log('delete from local storage: ', tabId);
  // we should only do this when tab closes not when port closes.
  chrome.storage.local.remove([`${tabId}`], function () {
    console.log('deleted', tabId, 'from local storage');
    chrome.storage.local.get(null, function (result) {
      console.log(
        'storage for whole local currently is ' + JSON.stringify(result)
      );
    });
  });
});
