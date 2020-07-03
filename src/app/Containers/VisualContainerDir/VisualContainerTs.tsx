import React, { useState } from 'react';
import Diff from '../../components/DiffDir/DiffTs';
import NavBar from '../../components/NavBarDir/NavBarTs';
import AtomTree from '../../components/AtomTree.jsx';
import Tree from '../../components/TreeDir/TreeTs';

interface VisualContainerProps {
  // snapshot at index [curRender -1]
  oldSnap: object,
  // snapshot at index [curRender]
  newSnap: object
}

// Renders Navbar and conditionally renders Diff, AtomTree, and Tree
const VisualContainer: React.FC<VisualContainerProps> = ({ oldSnap, newSnap }) => {
  // object containing all conditional renders based on navBar
  const nav = {
    Diff: <Diff oldSnap={oldSnap} newSnap={newSnap} />,
    Tree: <Tree newSnap={newSnap} />,
    Visualizer: <AtomTree newSnap={newSnap} />,
  };
  // array of all nav obj keys
  const tabsList = Object.keys(nav);
  // useState hook to update which component to render in the VisualContainer
  const [tab, setTab] = useState('Diff');
  // conditionally render based on value of nav[tab]
  return (
    <div className='VisualContainer'>
      <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
      {nav[tab]}
    </div>
  );
};

export default VisualContainer;
