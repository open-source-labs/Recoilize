import React, {useState} from 'react';
import Diff from '../components/Diff.jsx';
import Atoms from '../components/Atoms.jsx';

// conditionally renders Diff and Atoms
const VisualContainer = ({snapshots, oldSnap, newSnap}) => {
  // diff render passing in the two snapshots that will be compared
  const diff = <Diff oldSnap={oldSnap} newSnap={newSnap} />;
  // atoms render passing in the "atoms"
  const atoms = <Atoms snapshots={snapshots} />;
  // useState hook to update the component to render in the container
  const [tab, setTab] = useState(diff);
  return (
    <div className="VisualContainer">
      {/* render navbar wrapped in div */}
      <div className="navBar">
        <button
          onClick={() => {
            setTab(diff);
          }}>
          Diff
        </button>
        <button
          onClick={() => {
            setTab(atoms);
          }}>
          Atoms
        </button>
      </div>
      {/* conditional render */}
      {tab}
    </div>
  );
};

export default VisualContainer;
