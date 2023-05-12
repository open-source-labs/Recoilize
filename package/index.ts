import {useState, useEffect} from 'react';
import {
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilSnapshot,
  useGotoRecoilSnapshot,
  Snapshot,
  RecoilValue,
} from 'recoil';
import formatFiberNodes from './formatFiberNodes';

// grabs isPersistedState from sessionStorage
let isPersistedState: string | null =
  sessionStorage.getItem('isPersistedState');

// isRestored state disables snapshots from being recorded
// when we jump backwards
let isRestoredState: boolean = false;

// set default throttle to 70, throttle timer changes with every snapshot
let throttleTimer: number = 0;
let throttleLimit: number = 70;

// assign the value of selectorsObject in formatRecoilizeSelectors function
// will contain the selectors from a user application
let selectorsObject;

export default function RecoilizeDebugger(props: any) {
  // We should ask for Array of atoms and selectors.
  // Captures all atoms that were defined to get the initial state

  // Define a recoilizeRoot variable which will be assigned based on whether a root is passed in as a prop
  let recoilizeRoot: HTMLElement | null;

  // Check if a root was passed to props.
  if (props.root) {
    const {root} = props;
    recoilizeRoot = root;
  } else {
    recoilizeRoot = document.getElementById('root');
  }

  const snapshot: Snapshot = useRecoilSnapshot();

  // getNodes_UNSTABLE will return an iterable that contains atom and selector objects.
  const nodes: RecoilValue<unknown>[] = [...snapshot.getNodes_UNSTABLE()];
  // Local state of all previous snapshots to use for time traveling when requested by dev tools.
  const [snapshots, setSnapshots ] = useState<Snapshot[]>([snapshot]);
  // const [isRestoredState, setRestoredState] = useState(false);
  const gotoSnapshot = useGotoRecoilSnapshot();

  const filteredSnapshot = {};

  /*
  A nodeDeps object is constructed using getDeps_UNSTABLE. 
  This object will then be used to construct a nodeSubscriptions object. 
  After continuous testing, getSubscriptions_UNSTABLE was deemed too unreliable. 
  */

  const nodeDeps = {};
  const nodeSubscriptions = {};

  nodes.forEach(node => {
    const getDeps = [...snapshot.getInfo_UNSTABLE(node).deps];
    nodeDeps[node.key] = getDeps.map(dep => dep.key);
  });

  for (let key in nodeDeps) {
    nodeDeps[key].forEach(node => {
      if (nodeSubscriptions[node]) {
        nodeSubscriptions[node].push(key);
      } else {
        nodeSubscriptions[node] = [key];
      }
    });
  }

  // should re-type here
  // Traverse all atoms and selector state nodes and get value
  nodes.forEach((node: any, index) => {
    const type = node.__proto__.constructor.name;
    const contents = snapshot.getLoadable(node).contents;
    // Construct node data structure for dev tool to consume
    filteredSnapshot[node.key] = {
      type,
      contents,
      nodeDeps: nodeDeps[node.key],
      nodeToNodeSubscriptions: nodeSubscriptions[node.key]
        ? nodeSubscriptions[node.key]
        : [],
    };
  });

  // React lifecycle hook on re-render
  useEffect(() => {
    // Window listener for messages from dev tool UI & service_worker.js AKA background script
    window.addEventListener('message', onMessageReceived);

    if (!isRestoredState) {
      const devToolData = createDevToolDataObject(filteredSnapshot);

      /* 
      Post message to content script on every re-render of the developers 
      application
      */

      sendWindowMessage('recordSnapshot', devToolData);
    } else {
      isRestoredState = false;
    }
    // Clears the window event listener.
    return () => window.removeEventListener('message', onMessageReceived);
  });

  // Listener callback for messages sent to window
  const onMessageReceived = (msg: any) => {
    // deconstruct properties from object
    const {action, origininatedFrom, intendedRecipient, payload} = msg.data;

    // Add other actions from dev tool here
    switch (action) {
      // Checks to see if content script has started before sending initial snapshot
      case 'contentScriptStarted':
        if (isPersistedState === 'false' || isPersistedState === null) {
          const initialFilteredSnapshot =
            formatAtomSelectorRelationship(filteredSnapshot);
          // once application renders, grab the array of atoms and array of selectors
          const appsKnownAtomsArray = [
            ...snapshot._store.getState().knownAtoms,
          ];
          // console.log('Store State.getState: Atoms', appsKnownAtomsArray);
          const appsKnownSelectorsArray = [
            ...snapshot._store.getState().knownSelectors,
          ];
          // console.log('Store State.getState: Selectors', appsKnownSelectorsArray);

          const atomsAndSelectorsMsg = {
            atoms: appsKnownAtomsArray,
            selectors: appsKnownSelectorsArray,
            $selectors: selectorsObject, // the selectors object that contain key and set / get methods as strings
          };

          //creating a indexDiff variable
          //only created on initial creation of devToolData
          //determines difference in length of backend snapshots array and frontend snapshotHistoryLength to avoid off by one error
          const indexDiff = snapshots.length - 1;

          const devToolData = createDevToolDataObject(
            initialFilteredSnapshot,
            indexDiff,
            atomsAndSelectorsMsg,
          );
          sendWindowMessage('moduleInitialized', devToolData);
        } else {
          setProperIndexForPersistedState();
          sendWindowMessage('persistSnapshots', null);
        }

        break;
      // Listens for a request from dev tool to time travel to previous state of the app.
      case 'snapshotTimeTravel':
        timeTravelToSnapshot(msg);
        break;
      case 'persistState':
        switchPersistMode();
        break;
      // Implementing the throttle change
      case 'throttleEdit':
        throttleLimit = parseInt(payload.value);
        break;
      default:
        break;
    }
  };

  // assigns or switches isPersistedState in sessionStorage
  const switchPersistMode = () => {
    if (isPersistedState === 'false' || isPersistedState === null) {
      // switch isPersistedState in sessionStorage to true
      sessionStorage.setItem('isPersistedState', true);

      // stores the length of current list of snapshots in sessionStorage
      sessionStorage.setItem('persistedSnapshots', snapshots.length);
    } else {
      // switch isPersistedState in sessionStorage to false
      sessionStorage.setItem('isPersistedState', false);
    }
  };

  // function retreives length and fills snapshot array
  const setProperIndexForPersistedState = () => {
    const retreived = sessionStorage.getItem('persistedSnapshots');
    const snapshotsArray = new Array(Number(retreived) + 1).fill({});
    setSnapshots(snapshotsArray);
  };

  // old code below. May be delted if everything works
  // ****
  // Sends window an action and payload message.
  //

  // const sendWindowMessage = (action, payload) => {
  //   window.postMessage(
  //     JSON.parse(
  //       JSON.stringify({
  //         action,
  //         payload,
  //       }),
  //     ),
  //     '*',
  //   );
  // };

  // Sends window an action and payload message.
  const sendWindowMessage = (action: any, payload: any) => {
    // creates a a template object with origin and recipient
    const objectTemplate = {
      action: null,
      payload: null,
      origininatedFrom: 'RecoilizeDebugger',
      intendedRecipient: 'contentScript',
    };
    // create a new object to send to the window from the template and the passed in arguments
    const objectToSend = Object.assign({}, objectTemplate, {action, payload});
    // create a deep clone of the object
    const deepCopyOfObjectToSend = JSON.parse(JSON.stringify(objectToSend));
    // send the deep clone to the window
    window.postMessage(deepCopyOfObjectToSend, '*');
  };

  const createDevToolDataObject = (
    filteredSnapshot,
    diff,
    atomsAndSelectors,
  ) => {
    // test `React.createRoot` first
    let rootFiberNode =
      recoilizeRoot[
        Object.keys(recoilizeRoot).find(key =>
          key.startsWith('__reactContainer$'),
        )
      ] || recoilizeRoot._reactRootContainer._internalRoot.current;

    if (diff === undefined) {
      return {
        filteredSnapshot: filteredSnapshot,
        componentAtomTree: formatFiberNodes(rootFiberNode),
        atomsAndSelectors,
      };
    } else {
      return {
        filteredSnapshot: filteredSnapshot,
        componentAtomTree: formatFiberNodes(rootFiberNode),
        indexDiff: diff,
        atomsAndSelectors,
      };
    }
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

  // Will add hover effect over highlighted component
  // Takes an argument of msg.data which contains name and payload
  const activateHover = payload => {
    let name = payload.name;
  };

  // FOR TIME TRAVEL: time travels to a given snapshot, re renders application.
  const timeTravelToSnapshot = async (msg: any) => {
    isRestoredState = true;
    await gotoSnapshot(snapshots[msg.data.payload.snapshotIndex]);
  };

  // FOR TIME TRAVEL: Recoil hook to fire a callback on every snapshot change
  useRecoilTransactionObserver_UNSTABLE(({snapshot}) => {
    const now = new Date().getTime();
    if (now - throttleTimer < throttleLimit) {
      isRestoredState = true;
    } else {
      throttleTimer = now;
    }

    if (!isRestoredState) {
      setSnapshots([...snapshots, snapshot]);
    }
  });

  return null;
}

// function that receives objects to be passed into selector constructor function to post a message to the window
// cannot send an object with a property that contains a function to the window - need to stringify the set and get methods
export function formatRecoilizeSelectors(...selectors) {
  // create object to be sent via window message from target recoil application
  selectorsObject = {};
  // iterate through our array of objects
  selectors.forEach(selector => {
    // check if the current selector object contains a set method, if so, reassign it to a stringified version
    if (selector.hasOwnProperty('set')) {
      selector.set = selector.set.toString();
    }
    // check if the current selector object contains a get method, if so, reassign it to a stringified version
    if (selector.hasOwnProperty('get')) {
      selector.get = selector.get.toString();
    }
    // store the selector in the payload object - providing its property name as the 'key' property of the current selector object
    // providing the object the property name of selector key will give easy searchability in GUI application for selector dropdown
    selectorsObject[selector.key] = selector;
  });
}
