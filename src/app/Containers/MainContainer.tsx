import React, {useState, useEffect} from 'react';
import SnapshotsContainer from './SnapshotContainer';
import VisualContainer from './VisualContainer';
import {stateSnapshot, selectedTypes, stateSnapshotDiff} from '../../types';

interface MainContainerProps {
  // snapshotHistory is an array of stateSnapshots
  snapshotHistory: stateSnapshot[];
  selected: selectedTypes[];
  setSelected: React.Dispatch<React.SetStateAction<selectedTypes[]>>;
  filter: stateSnapshotDiff[];
}

// wraps entire application
const MainContainer: React.FC<MainContainerProps> = ({
  snapshotHistory,
  selected,
  setSelected,
  filter,
}) => {
  // useState hook to update the index of current snapshot rendered in devtool
  const [renderIndex, setRenderIndex] = useState<number>(
    snapshotHistory.length - 1,
  );

  // Todo: usestate hook to update an array with all of the delta snapshots

  // useEffect for renderIndex
  useEffect(() => {

    setRenderIndex(snapshotHistory.length - 1);

  }, [snapshotHistory]);

  // render containers passing necessary props
  return (
    <div className="MainContainer">
      <SnapshotsContainer
        // index of current snapshot rendered in devtool
        renderIndex={renderIndex}
        // length of snapshotHistory array
        snapshotHistoryLength={snapshotHistory.length}
        // setState functionality to update renderIndex
        setRenderIndex={setRenderIndex}
        // ! passing through selected
        selected={selected}
        filter={filter}
        snapshotHistory={snapshotHistory}
      />
      <VisualContainer
        // snapshot at index [renderIndex -1]
        previousSnapshot={snapshotHistory[renderIndex - 1]}
        // snapshot at index [renderIndex]
        currentSnapshot={(snapshotHistory[renderIndex]) ? snapshotHistory[renderIndex] : snapshotHistory[0]}
        // !passing through snapshotHistory
        snapshotHistory={snapshotHistory}
        // !passing through selections
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default MainContainer;
