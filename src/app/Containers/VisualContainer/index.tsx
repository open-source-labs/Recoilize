import React, {useState} from 'react';
import Diff from '../../components/Diff';
import NavBar from '../../components/NavBar';
import Visualizer from '../../components/Visualizer/Visualizer';
import Tree from '../../components/Tree';
import Network from '../../components/Network';
import AtomComponentVisualContainer from '../AtomComponentTreeContainer';
import {stateSnapshot} from '../../../types';

interface VisualContainerProps {
  // snapshot at index [curRender -1]
  previousSnapshot: stateSnapshot;
  // snapshot at index [curRender]
  currentSnapshot: stateSnapshot;
}

type navTypes = {
  [tabName: string]: JSX.Element;
};

// Renders Navbar and conditionally renders Diff, Visualizer, and Tree
const VisualContainer: React.FC<VisualContainerProps> = ({
  previousSnapshot,
  currentSnapshot,
}) => {
  // conditional render of filtered snaps/ based on non-filtered snaps
  const filteredCurSnap = currentSnapshot
    ? currentSnapshot.filteredSnapshot
    : undefined;
  const filteredPrevSnap = previousSnapshot
    ? previousSnapshot.filteredSnapshot
    : undefined;
  const componentAtomTree = currentSnapshot
    ? currentSnapshot.componentAtomTree
    : undefined;
  //const atomsAndSelectors = currentSnapshot ? currentSnapshot.atomsAndSelectors : undefined;
  // object containing all conditional renders based on navBar
  const nav: navTypes = {
    // compare the diff of filteredPrevSnap and filteredCurSnap
    Diff: (
      <Diff
        filteredPrevSnap={filteredPrevSnap}
        filteredCurSnap={filteredCurSnap}
      />
    ),
    // render JSON tree of snapshot
    Tree: <Tree filteredCurSnap={filteredCurSnap} />,
    // individual snapshot visualizer
    Visualizer: <Visualizer filteredCurSnap={filteredCurSnap} />,
    // atom and selector subscription relationship
    Network: <Network filteredCurSnap={filteredCurSnap} />,
    // tree visualizer of components showing atom/selector relationships
    AtomComponentVisualContainer: (
      <AtomComponentVisualContainer
        componentAtomTree={componentAtomTree}
        filteredSnapshot={filteredCurSnap}
      />
    ),
  };
  // array of all nav obj keys
  const tabsList = Object.keys(nav);
  // useState hook to update which component to render in the VisualContainer
  const [tab, setTab] = useState('Diff');
  // conditionally render based on value of nav[tab]
  return (
    <div className="VisualContainer">
      <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
      {nav[tab]}
    </div>
  );
};

export default VisualContainer;
