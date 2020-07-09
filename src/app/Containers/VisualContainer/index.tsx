import React, { useState } from 'react';
import Diff from '../../components/Diff';
import NavBar from '../../components/NavBar';
import Visualizer from '../../components/Visualizer.jsx';
import Tree from '../../components/Tree';
import Network from '../../components/Network';
import { stateSnapshot, filteredSnapshot } from '../../../types';

interface VisualContainerProps {
  // snapshot at index [curRender -1]
  oldSnap: stateSnapshot;
  // snapshot at index [curRender]
  newSnap: stateSnapshot;
}

type navTypes = {
  [tabName: string]: JSX.Element;
};

// Renders Navbar and conditionally renders Diff, Visualizer, and Tree
const VisualContainer: React.FC<VisualContainerProps> = ({
  oldSnap,
  newSnap,
}) => {
  // object containing all conditional renders based on navBar
  const newFilteredSnapshot = newSnap ? newSnap.filteredSnapshot : null;
  const oldFilteredSnapshot = oldSnap ? oldSnap.filteredSnapshot : null;
  const nav: navTypes = {
    Diff: <Diff oldSnap={oldFilteredSnapshot} newSnap={newFilteredSnapshot} />,
    Tree: <Tree newSnap={newFilteredSnapshot} />,
    Visualizer: <Visualizer newSnap={newFilteredSnapshot} />,
    Network: <Network newSnap={newFilteredSnapshot} />
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
