import React, {useState, useEffect, useContext, createContext} from 'react';
// import SnapshotsContainer from './SnapshotContainer';
import VisualContainer from './VisualContainer';


interface RenderIndexContext {
  renderIndex: number;
  setRenderIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const renderIndexContext = createContext<RenderIndexContext>(null);

// wraps entire application
const MainContainer: React.FC = () => {
  // index of current snapshot rendered in devtool
  // const [renderIndex, setRenderIndex] = useState<number>(
  //   snapshotHistory.length - 1,
  // );

  // Todo: useState hook to update an array with all of the delta snapshots

  // useEffect for renderIndex
  // whenever snapshotHistory changes, update renderIndex
  // useEffect(() => {

  //   setRenderIndex(snapshotHistory.length - 1);

  // }, [snapshotHistory]);

  // render containers passing necessary props
  return (
    <div className="MainContainer">
    {/* <renderIndexContext.Provider value={{renderIndex, setRenderIndex}}> */}
      {/* <SnapshotsContainer /> */}
      {/* </renderIndexContext.Provider> */}

      <VisualContainer/>
    </div>
  );
};

export default MainContainer;
