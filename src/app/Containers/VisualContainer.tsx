import React, {useState} from 'react';
import Diff from '../components/StateDiff/Diff';
import NavBar from '../components/NavBar/NavBar';
import Metrics from '../components/Metrics/MetricsContainer';
import Tree from '../components/StateTree/Tree';
import Network from '../components/AtomNetwork/AtomNetwork';
import AtomComponentVisualContainer from '../components/ComponentGraph/AtomComponentContainer';
import Settings from '../components/Settings/SettingsContainer';

type navTypes = {
  [tabName: string]: JSX.Element;
};

// Renders Navbar and conditionally renders Diff, Visualizer, and Tree
const VisualContainer: React.FC = () => {
  // object containing all conditional renders based on navBar
  const nav: navTypes = {
    // compare the diff of filteredPrevSnap and filteredCurSnap
    'State Diff': <Diff />,
    // render JSON tree of snapshot
    'State Tree': <Tree />,
    // tree visualizer of components showing atom/selector relationships
    'Component Graph': <AtomComponentVisualContainer />,

    // atom and selector subscription relationship
    'Atom Network': <Network />,

    // quotes not needed where name = component variable
    // individual snapshot visualizer
    Metrics: <Metrics />,

    // settings tab
    Settings: <Settings />,
  };
  // array of all nav obj keys
  const tabsList: string[] = Object.keys(nav);
  // useState hook to update which component to render in the VisualContainer
  const [tab, setTab] = useState<string>('State Diff');
  // conditionally render based on value of nav[tab]
  return (
    <div className="VisualContainer">
      <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
      {nav[tab]}
    </div>
  );
};

export default VisualContainer;
