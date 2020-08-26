import React, {useState} from 'react';
import AtomComponentVisual from '../../components/AtomComponent';
import AtomSelectorLegend from '../../components/AtomSelectorLegend';
import {
  componentAtomTree,
  filteredSnapshot,
  atom,
  selector,
} from '../../../types';

interface AtomComponentVisualContainerProps {
  filteredCurSnap: filteredSnapshot;
  componentAtomTree: componentAtomTree;
}

const AtomComponentVisualContainer: React.FC<AtomComponentVisualContainerProps> = ({
  filteredCurSnap,
  componentAtomTree,
}) => {
  // this will be the atom or selector from the AtomSelectorLegend that the user clicked on.  an array with the ele at index 0 as the name of the atom/selector, and ele at index 1 will be 'atom' or 'selector'
  // Why was selectedRecoilValue formatted as an array? why not an object?
  const [selectedRecoilValue, setSelectedRecoilValue] = useState<string[]>([]);
  const [str, setStr] = useState<string[]>([]);

  // each property in the atoms or selectors object will be a property whose key is the atom or selector name, and whose value is the value of that atom or selector
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
        selectedRecoilValue={selectedRecoilValue}
        atoms={atoms}
        selectors={selectors}
        setStr={setStr}
      />
      <div id="legendFlexContainer">
        <AtomSelectorLegend
          selectedRecoilValue={selectedRecoilValue}
          setSelectedRecoilValue={setSelectedRecoilValue}
          atoms={atoms}
          selectors={selectors}
          str={str}
        />
      </div>
    </div>
  );
};

export default AtomComponentVisualContainer;
