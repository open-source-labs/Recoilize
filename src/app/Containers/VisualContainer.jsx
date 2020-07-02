import React, { useState } from 'react';
import Diff from '../components/Diff.jsx';
import Atoms from '../components/Atoms.jsx';
import NavBar from '../components/NavBar.jsx';
import AtomTree from '../components/AtomTree.jsx';
import Tree from '../components/Tree.jsx';

// conditionally renders Diff, Atoms, AtomTree, and Tree
const VisualContainer = ({ snapshotHistory, oldSnap, newSnap }) => {
  // object containing all conditional renders based on navBar
  const nav = {
    Diff: (
      <Diff
        // snapshot at index [curRender -1]
        oldSnap={oldSnap}
        // snapshot at index [curRender]
        newSnap={newSnap}
      />
    ),
    Atoms: (
      <Atoms
        // array of snapshots CURRENT NOT IN USE
        snapshotHistory={snapshotHistory}
      />
    ),
    Tree: (
      <Tree
        // snapshot at index [curRender]
        curSnap={newSnap}
      />
    ),
    'Atom Tree': <AtomTree newSnap={newSnap} />,
  };
  // array of all all nav obj keys as strings
  const tabsList = Object.keys(nav);
  // useState hook to update the component to render in the container
  const [tab, setTab] = useState('Diff');
  return (
    <div className='VisualContainer'>
      <NavBar setTab={setTab} tabsList={tabsList} />
      {nav[tab]}
    </div>
  );
};

export default VisualContainer;
