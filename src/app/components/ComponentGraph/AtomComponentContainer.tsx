import React, {useState} from 'react';
import AtomComponentVisual from './AtomComponentVisual';
import {
  filteredSnapshot,
  atom,
  selector,
} from '../../../types';

import {useAppSelector} from '../../state-management/hooks';

const AtomComponentVisualContainer: React.FC = () => {
  //Retrieve State from store
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const renderIndex = useAppSelector(state => state.snapshot.renderIndex);
  const cleanedComponentAtomTree = useAppSelector(
    state => state.snapshot.cleanComponentAtomTree,
  );
  const filteredCurSnap: filteredSnapshot =
    snapshotHistory[renderIndex].filteredSnapshot;
  const componentAtomTree = snapshotHistory[renderIndex].componentAtomTree;

  // this will be the atom or selector from the AtomSelectorLegend that the user clicked on.  an array with the ele at index 0 as the name of the atom/selector, and ele at index 1 will be 'atom' or 'selector'
  // Why was selectedRecoilValue formatted as an array? why not an object?
  const [selectedRecoilValue, setSelectedRecoilValue] = useState<string[]>([]);
  const [str, setStr] = useState<string[]>([]);

  // each property in the atoms or selectors object will be a property whose key is the atom or selector name,
  // and whose value is the value of that atom or selector
  const atoms: atom = {};
  const selectors: selector = {};
  if (filteredCurSnap) {
    for (let [recoilValueName, object] of Object.entries(filteredCurSnap)) {
      if (!object.nodeDeps.length) {
        atoms[recoilValueName] = object.contents;
      } else {
        selectors[recoilValueName] = object.contents;
      }
    }
  }

  return (
    <div className="Component">
      <AtomComponentVisual
        componentAtomTree={componentAtomTree}
        cleanedComponentAtomTree={cleanedComponentAtomTree}
        selectedRecoilValue={selectedRecoilValue}
        setSelectedRecoilValue={setSelectedRecoilValue}
        atoms={atoms}
        selectors={selectors}
        setStr={setStr}
      />
    </div>
  );
};

export default AtomComponentVisualContainer;
