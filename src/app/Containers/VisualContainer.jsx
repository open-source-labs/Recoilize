import React, {useState} from 'react';
import Diff from '../components/Diff.jsx';
import Atoms from '../components/Atoms.jsx';
import NavBar from '../components/NavBar.jsx';

// conditionally renders Diff and Atoms
const VisualContainer = ({snapshots, oldSnap, newSnap}) => {
  const nav = {
    // diff render passing in the two snapshots that will be compared
    diff: <Diff oldSnap={oldSnap} newSnap={newSnap} />,
    // atoms render passing in the "atoms"
    atoms: <Atoms snapshots={snapshots} />,
  };
  // list of all tab strings to use in NavBar.jsx
  const tabsList = Object.keys(nav);
  // useState hook to update the component to render in the container
  const [tab, setTab] = useState('diff');
  return (
    <div className="VisualContainer">
      {/* render navbar wrapped in div */}
      <NavBar setTab={setTab} tabsList={tabsList} />
      {/* conditional render */}
      {nav[tab]}
    </div>
  );
};

export default VisualContainer;
