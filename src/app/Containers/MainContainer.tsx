import React, {useState, useEffect, useContext, createContext} from 'react';
import SnapshotsContainer from './SnapshotContainer';
import VisualContainer from './VisualContainer';
import {snapshotHistoryContext, selectedContext, filterContext} from '../components/App';
import {stateSnapshot, selectedTypes, stateSnapshotDiff} from '../../types';

interface RenderIndexContext {
  renderIndex: number;
  setRenderIndex: React.Dispatch<React.SetStateAction<number>>
}

export const renderIndexContext = createContext<RenderIndexContext>(null);

// wraps entire application
const MainContainer: React.FC<MainContainerProps> = () => {
  const {snapshotHistory} = useContext(snapshotHistoryContext);
  // index of current snapshot rendered in devtool
  const [renderIndex, setRenderIndex] = useState<number>(
    snapshotHistory.length - 1,
  );

  // Todo: useState hook to update an array with all of the delta snapshots

  // useEffect for renderIndex
  // whenever snapshotHistory changes, update renderIndex
  useEffect(() => {

    setRenderIndex(snapshotHistory.length - 1);

  }, [snapshotHistory]);

  // render containers passing necessary props
  return (
    <div className="MainContainer">
    <renderIndexContext.Provider value={{renderIndex, setRenderIndex}}>
      <SnapshotsContainer
        // length of snapshotHistory array
        snapshotHistoryLength={snapshotHistory.length}
      />
      </renderIndexContext.Provider>

      <VisualContainer
        // snapshot at index [renderIndex -1]
        previousSnapshot={snapshotHistory[renderIndex - 1]}
        // snapshot at index [renderIndex]
        currentSnapshot={(snapshotHistory[renderIndex]) ? snapshotHistory[renderIndex] : snapshotHistory[0]}
      />
    </div>
  );
};

export default MainContainer;
