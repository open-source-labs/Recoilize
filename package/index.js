import React, {useState, useEffect} from 'react';
import {
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilSnapshot,
  useGotoRecoilSnapshot,
  useRecoilValue,
  useRecoilValueLoadable,
  useRecoilCallback,
} from 'recoil';
import {formatFiberNodes} from './formatFiberNodes';

// isRestored state disables snapshots from being recorded
let isRestoredState = false;

// throttle is an object that keeps track of the throttle settings made by the user
let throttleTimer = 0;
let throttleLimit = 0;

export default function RecoilizeDebugger(props) {
  // ! the props can go here, a message can be made to edit the global object for throttling
  const throttle = () => {
    const now = new Date().getTime();
    // if we get a series of 5 in a row called super fast, then we want to turn the throttle on
    if (now - throttleTimer < throttleLimit) {
      isRestoredState = true;
    } else {
      throttleTimer = now;
    }
  };
  throttle();

  // We should ask for Array of atoms and selectors.
  // Captures all atoms that were defined to get the initial state

  const {root} = props;

  let nodes = null;

  if (typeof props.nodes === 'object' && !Array.isArray(props.nodes)) {
    nodes = Object.values(props.nodes);
  } else if (Array.isArray(props.nodes)) {
    nodes = props.nodes;
  }

  const snapshot = useRecoilSnapshot();
  // Local state of all previous snapshots to use for time traveling when requested by dev tools.
  const [snapshots, setSnapshots] = useState([snapshot]);
  // const [isRestoredState, setRestoredState] = useState(false);
  const gotoSnapshot = useGotoRecoilSnapshot();

  const filteredSnapshot = {};
  const currentTree = snapshot._store.getState().currentTree;

  // Traverse all atoms and selector state nodes and get value
  nodes.forEach((node, index) => {
    const type = node.__proto__.constructor.name;
    const contents = snapshot.getLoadable(node).contents;
    const nodeDeps = currentTree.nodeDeps.get(node.key);
    const nodeToNodeSubscriptions = currentTree.nodeToNodeSubscriptions.get(
      node.key,
    );

    // Construct node data structure for dev tool to consume
    filteredSnapshot[node.key] = {
      type,
      contents,
      nodeDeps: nodeDeps ? Array.from(nodeDeps) : [],
      nodeToNodeSubscriptions: nodeToNodeSubscriptions
        ? Array.from(nodeToNodeSubscriptions)
        : [],
    };
  });

  // React lifecycle hook on re-render
  useEffect(() => {
    if (!isRestoredState) {
      setTimeout(() => {
        const devToolData = createDevToolDataObject(filteredSnapshot);

        // Post message to content script on every re-render of the developers application only if content script has started
        sendWindowMessage('recordSnapshot', devToolData);
      });
    } else {
      isRestoredState = false;
    }

    // Window listener for messages from dev tool UI & background.js
    window.addEventListener('message', onMessageReceived);

    // Clears the window event listener.
    return () => window.removeEventListener('message', onMessageReceived);
  });

  // Listener callback for messages sent to windowf
  const onMessageReceived = msg => {
    // Add other actions from dev tool here
    switch (msg.data.action) {
      // Checks to see if content script has started before sending initial snapshot
      case 'contentScriptStarted':
        const initialFilteredSnapshot = formatAtomSelectorRelationship(
          filteredSnapshot,
        );
        const devToolData = createDevToolDataObject(initialFilteredSnapshot);
        sendWindowMessage('moduleInitialized', devToolData);
        break;
      // Listens for a request from dev tool to time travel to previous state of the app.
      case 'snapshotTimeTravel':
        timeTravelToSnapshot(msg);
        break;
      // Todo: Implementing the throttle change
      case 'throttleEdit':
        let throttleVal = parseInt(msg.data.payload.value);
        throttleLimit = throttleVal;
        console.log('this is the throttleEdits', throttleVal);
        break;

      default:
        break;
    }
  };

  // Sends window an action and payload message.
  const sendWindowMessage = (action, payload) => {
    window.postMessage(
      {
        action,
        payload,
      },
      '*',
    );
  };

  const createDevToolDataObject = filteredSnapshot => {
    return {
      filteredSnapshot: filteredSnapshot,
      componentAtomTree: formatFiberNodes(
        root._reactRootContainer._internalRoot.current,
      ),
    };
  };

  const formatAtomSelectorRelationship = filteredSnapshot => {
    if (
      window.$recoilDebugStates &&
      Array.isArray(window.$recoilDebugStates) &&
      window.$recoilDebugStates.length
    ) {
      let snapObj =
        window.$recoilDebugStates[window.$recoilDebugStates.length - 1];
      if (snapObj.hasOwnProperty('nodeDeps')) {
        for (let [key, value] of snapObj.nodeDeps) {
          filteredSnapshot[key].nodeDeps = Array.from(value);
        }
      }
      if (snapObj.hasOwnProperty('nodeToNodeSubscriptions')) {
        for (let [key, value] of snapObj.nodeToNodeSubscriptions) {
          filteredSnapshot[key].nodeToNodeSubscriptions = Array.from(value);
        }
      }
    }
    return filteredSnapshot;
  };

  // FOR TIME TRAVEL: time travels to a given snapshot, re renders application.
  const timeTravelToSnapshot = async msg => {
    // await setRestoredState(true);
    // await gotoSnapshot(snapshots[msg.data.payload.snapshotIndex]);
    // await setRestoredState(false);

    isRestoredState = true;
    await gotoSnapshot(snapshots[msg.data.payload.snapshotIndex]);
  };

  // FOR TIME TRAVEL: Recoil hook to fire a callback on every snapshot change
  useRecoilTransactionObserver_UNSTABLE(({snapshot}) => {
    if (!isRestoredState) {
      setSnapshots([...snapshots, snapshot]);
    }
  });

  return null;
}
