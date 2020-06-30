import React, { useState } from 'react';
import Diff from '../components/Diff.jsx';
import Atoms from '../components/Atoms.jsx';
import NavBar from '../components/NavBar.jsx';

// conditionally renders Diff and Atoms
const VisualContainer = ({ snapshots, oldSnap, newSnap }) => {
  // object containing all conditional renders based on navBar
  const nav = {
    diff: (
      <Diff
        // snapshot at index [curRender -1]
        oldSnap={oldSnap}
        // snapshot at index [curRender]
        newSnap={newSnap}
      />
    ),
    atoms: (
      <Atoms
        // array of snapshots CURRENT NOT IN USE
        snapshots={snapshots}
      />
    ),
    atomTree: <AtomTree snapshotHistory={snapshots} />,
  };
  // array of all all nav obj keys as strings
  const tabsList = Object.keys(nav);
  // useState hook to update the component to render in the container
  const [tab, setTab] = useState('diff');
  return (
    <div className='VisualContainer'>
      <NavBar setTab={setTab} tabsList={tabsList} />
      {nav[tab]}
    </div>
  );
};

export default VisualContainer;
