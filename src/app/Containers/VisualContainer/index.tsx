import React, {useState} from 'react';
import Diff from '../../components/Diff';
import NavBar from '../../components/NavBar';
import Visualizer from '../../components/Visualizer';
import Tree from '../../components/Tree';
import Network from '../../components/Network';
import AtomComponentVisualContainer from '../AtomComponentTreeContainer';
import Settings from '../../components/Settings';
import {stateSnapshot} from '../../../types';

interface VisualContainerProps {
  // snapshot at index [curRender -1]
  previousSnapshot: stateSnapshot;
  // snapshot at index [curRender]
  currentSnapshot: stateSnapshot;
  // ! passing through snapshot history
  snapshotHistory: stateSnapshot[];
  selected: any;
  setSelected: any;
}

type navTypes = {
  [tabName: string]: JSX.Element;
};

// Renders Navbar and conditionally renders Diff, Visualizer, and Tree
const VisualContainer: React.FC<VisualContainerProps> = ({
  previousSnapshot,
  currentSnapshot,
  snapshotHistory,
  selected,
  setSelected,
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
  // object containing all conditional renders based on navBar
  const nav: navTypes = {
    // compare the diff of filteredPrevSnap and filteredCurSnap
    'State Diff': (
      <Diff
        filteredPrevSnap={filteredPrevSnap}
        filteredCurSnap={filteredCurSnap}
      />
    ),
    // render JSON tree of snapshot
    'State Tree': <Tree filteredCurSnap={filteredCurSnap} />,
    // individual snapshot visualizer
    'State Graph': <Visualizer filteredCurSnap={filteredCurSnap} />,
    // atom and selector subscription relationship
    'Atom Network': <Network filteredCurSnap={filteredCurSnap} />,
    // tree visualizer of components showing atom/selector relationships
    'Component Graph': (
      <AtomComponentVisualContainer
        componentAtomTree={componentAtomTree}
        filteredCurSnap={filteredCurSnap}
      />
    ),
    // settings tab that doesn't want to be in quotes because too cool for school
    Settings: (
      <Settings
        snapshotHistory={snapshotHistory}
        selected={selected}
        setSelected={setSelected}
      />
    ),
  };
  // array of all nav obj keys
  const tabsList = Object.keys(nav);
  // useState hook to update which component to render in the VisualContainer
  const [tab, setTab] = useState('State Diff');
  // conditionally render based on value of nav[tab]
  return (
    <div className="VisualContainer">
      <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
      {nav[tab]}
    </div>
  );
};

export default VisualContainer;
