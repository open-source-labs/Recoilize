import React, { useState } from 'react';
import Diff from '../../components/DiffDir/Diff.jsx';
import NavBar from '../../components/NavBarDir/NavBar.jsx';
import AtomTree from '../../components/AtomTree.jsx';
import Tree from '../../components/TreeDir/Tree.jsx';
import PropTypes from 'prop-types';

// Renders Navbar and conditionally renders Diff, AtomTree, and Tree
const VisualContainer = ({ oldSnap, newSnap }) => {
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

VisualContainer.propTypes = {
  // snapshot at index [curRender -1]
  oldSnap: PropTypes.object,
  // snapshot at index [curRender]
  newSnap: PropTypes.object,
};

export default VisualContainer;
