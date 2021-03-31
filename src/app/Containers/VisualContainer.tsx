import React, {createContext, useContext, useState} from 'react';
import Diff from '../components/StateDiff/Diff';
import NavBar from '../components/NavBar/NavBar';
// import Metrics from '../components/Metrics/MetricsContainer';
// import Tree from '../components/StateTree/Tree';
// import Network from '../components/AtomNetwork/AtomNetwork';
// import AtomComponentVisualContainer from '../components/ComponentGraph/AtomComponentContainer';
// import Settings from '../components/Settings/SettingsContainer';
// import {stateSnapshot, componentAtomTree} from '../../types';
// import Metrics from "../cosmponents/StateGraph/metrics";

// interface VisualContainerProps {
//   // snapshot at index [curRender -1]
//   previousSnapshot: stateSnapshot;
//   // snapshot at index [curRender]
//   currentSnapshot: stateSnapshot;
// }

interface ZoomState {
  x: number;
  y: number;
  k: number;
}

interface CheckedContext {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}


interface ZoomStateContext {
  zoomState: ZoomState;
  setZoomState: React.Dispatch<React.SetStateAction<ZoomState>>;
}

type navTypes = {
  [tabName: string]: JSX.Element;
};

// const cleanComponentAtomTree = (
//   inputObj: componentAtomTree,
// ): componentAtomTree => {
//   const obj = {} as componentAtomTree;
//   let counter = 0;
//   const innerClean = (inputObj: any, outputObj: any, counter: number = 0) => {
//     if (
//       (inputObj.tag === 0 || inputObj.tag === 2) &&
//       inputObj.name !== 'RecoilRoot' &&
//       inputObj.name !== 'Batcher' &&
//       inputObj.name !== 'RecoilizeDebugger' &&
//       inputObj.name !== 'CssBaseline'
//     ) {
//       // if the obj is empty, we do this
//       if (Object.keys(obj).length === 0) {
//         outputObj.children = [];
//         outputObj.name = inputObj.name;
//         outputObj.recoilNodes = inputObj.recoilNodes;
//         outputObj.tag = inputObj.tag;
//         outputObj = outputObj.children;
//       }
//       // create another conditional
//       else {
//         const deepCopy: componentAtomTree = JSON.parse(
//           JSON.stringify(inputObj),
//         );
//         deepCopy.children = [];
//         outputObj.push(deepCopy);
//         if (outputObj.length > 1) {
//           outputObj = outputObj[outputObj.length - 1].children;
//         } else {
//           outputObj = outputObj[0].children;
//         }
//       }
//     }
//     // recursive call running through the whole component atom tree -- understand this better
//     for (let i = 0; i < inputObj.children.length; i++) {
//       innerClean(inputObj.children[i], outputObj, counter);
//     }
//     return outputObj;
//   };
//   innerClean(inputObj, obj, counter);

//   //ensure that the root element's actual duration is included in outObj
//   if (inputObj.actualDuration) {
//     obj.actualDuration = inputObj.actualDuration;
//   }

//   // returning the new object that we create
//   return obj;
// };

// Renders Navbar and conditionally renders Diff, Visualizer, and Tree
const VisualContainer: React.FC = () => {
  // state for checkmark in persist state in settings
  const [checked, setChecked] = useState<boolean>(false);
  
  // this state allows the canvas to stay at the zoom level on multiple re-renders
  const [{x, y, k}, setZoomState] = useState<ZoomState>({
    x: 50,
    y: 380,
    k: 0.07,
  });

  // conditional render of filtered snaps/ based on non-filtered snaps
  // const filteredCurSnap = currentSnapshot
  //   ? currentSnapshot.filteredSnapshot
  //   : undefined;
  // const filteredPrevSnap = previousSnapshot
  //   ? previousSnapshot.filteredSnapshot
  //   : undefined;
  // const componentAtomTree = currentSnapshot
  //   ? currentSnapshot.componentAtomTree
  //   : undefined;
  // const cleanedComponentAtomTree = currentSnapshot
  //   ? cleanComponentAtomTree(currentSnapshot.componentAtomTree)
  //   : undefined;

  // object containing all conditional renders based on navBar
  const nav: navTypes = {
    // compare the diff of filteredPrevSnap and filteredCurSnap
    'State Diff': <Diff />,
    // render JSON tree of snapshot
    // 'State Tree': <Tree filteredCurSnap={filteredCurSnap} />,
    // tree visualizer of components showing atom/selector relationships
    // 'Component Graph': (
    //   <zoomStateContext.Provider value={{zoomState: {x, y, k}, setZoomState}}>
    //     <AtomComponentVisualContainer
    //       componentAtomTree={componentAtomTree}
    //       cleanedComponentAtomTree={cleanedComponentAtomTree}
    //       filteredCurSnap={filteredCurSnap}
    //     />
    //   </zoomStateContext.Provider>
    // ),

    // atom and selector subscription relationship
    // 'Atom Network': <Network filteredCurSnap={filteredCurSnap} />,

    // individual snapshot visualizer
    // Metrics: <Metrics cleanedComponentAtomTree={cleanedComponentAtomTree} />,

    // settings tab that doesn't want to be in quotes because too cool for school
    // Settings: (
    //   <checkedContext.Provider value={{checked, setChecked}}>
    //        <Settings />
    //   </checkedContext.Provider>
    // ),
  };
  // array of all nav obj keys
  const tabsList: string[] = Object.keys(nav);
  // useState hook to update which component to render in the VisualContainer
  const [tab, setTab] = useState<string>('State Diff');
  // conditionally render based on value of nav[tab]
  return (
    <div className="VisualContainer">
      <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
      {nav[tab]}
    </div>
  );
};

export const checkedContext = createContext<CheckedContext>(null);
export const zoomStateContext = createContext<ZoomStateContext>(null);
export default VisualContainer;
