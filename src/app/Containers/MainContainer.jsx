import React, {useState} from 'react';
import SnapshotsContainer from './SnapshotsContainer';
import VisualContainer from './VisualContainer';

// wraps entire application
const MainContainer = () => {
  // dummy state representing our array of state snapshots
  const [snapshots, setSnapshots] = useState([
    // initial state representation
    {},
    {
      // dummy state
      name: 'foo',
      // index utilized to update the diff comparison
      index: 1,
      // dummy state
      arr: [1, 2, 3, 4, 5],
    },
    {
      name: 'foo2',
      index: 2,
      arr: [1, 2, 3, 4, 5],
    },
    {
      name: 'fizz',
      index: 3,
      arr: ['a', 'b', 'c', 'd', 'e'],
    },
    {
      name: 'buzz',
      index: 4,
      arr: ['f', 'g', 'h', 'i', 'j'],
    },
  ]);
  // dummy state representing the most recent state/clicked state and the previous state
  const [curRender, setCurRender] = useState(snapshots.length - 1);
  return (
    <div className="MainContainer">
      <SnapshotsContainer
        setCurRender={setCurRender}
        snapshots={snapshots}
      />
      <VisualContainer
        snapshots={snapshots}
        oldSnap={snapshots[curRender - 1]}
        newSnap={snapshots[curRender]}
      />
    </div>
  );
};

export default MainContainer;
