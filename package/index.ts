import {useState, useEffect} from 'react';
import {
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilSnapshot,
  useGotoRecoilSnapshot,
} from 'recoil';
import formatFiberNodes from './formatFiberNodes';

// isRestored state disables snapshots from being recorded
let isRestoredState = false;

export default function RecoilizeDebugger(props: any) {
  // We should ask for Array of atoms and selectors.
  // Captures all atoms that were defined to get the initial state
  let nodes = null;

  if (typeof props.nodes === 'object' && !Array.isArray(props.nodes)) {
    nodes = Object.values(props.nodes);
  } else if (Array.isArray(props.nodes)) {
    nodes = props.nodes;
  }

  const {root} = props;

  const snapshot: any = useRecoilSnapshot();

  // Local state of all previous snapshots to use for time traveling when requested by dev tools.
  const [snapshots, setSnapshots] = useState([snapshot]);
  // const [isRestoredState, setRestoredState] = useState(false);
  const gotoSnapshot = useGotoRecoilSnapshot();

  const filteredSnapshot: any = {};
  const currentTree = snapshot._store.getState().currentTree;

  // Traverse all atoms and selector state nodes and get value
  nodes.forEach((node: any) => {
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
      }, 0);
    } else {
      isRestoredState = false;
    }

    // Window listener for messages from dev tool UI & background.js
    window.addEventListener('message', onMessageReceived);

    // Clears the window event listener.
    return () => window.removeEventListener('message', onMessageReceived);
  });

  // Listener callback for messages sent to window
  const onMessageReceived = (msg: any) => {
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
      default:
        break;
    }
  };

  // Sends window an action and payload message.
  const sendWindowMessage = (action: any, payload: any) => {
    window.postMessage(
      {
        action,
        payload,
      },
      '*',
    );
  };

  const createDevToolDataObject = (filteredSnapshot: any) => {
    return {
      filteredSnapshot: filteredSnapshot,
      componentAtomTree: formatFiberNodes(
        root._reactRootContainer._internalRoot.current,
      ),
    };
  };

  const formatAtomSelectorRelationship = (filteredSnapshot: any) => {
    const windowAny: any = window;

    if (
      windowAny.$recoilDebugStates &&
      Array.isArray(windowAny.$recoilDebugStates) &&
      windowAny.$recoilDebugStates.length
    ) {
      let snapObj =
        windowAny.$recoilDebugStates[windowAny.$recoilDebugStates.length - 1];
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
  const timeTravelToSnapshot = async (msg: any) => {
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
