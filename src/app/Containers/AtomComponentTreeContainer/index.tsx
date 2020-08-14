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
  const [selectedRecoilValue, setSelectedRecoilValue] = useState([]);
  const [legend, setLegend] = useState(true);
  const [str, setStr] = useState('');

  // each property in the atoms or selectors object will be a property whose key is the atom or selector name, and whose value is the value of that atom or selector
  const atoms: atom = {};
  const selectors: selector = {};
  if (filteredCurSnap) {
    for (let [recoilValueName, object] of Object.entries<any>(
      filteredCurSnap,
    )) {
      if (object.type === 'RecoilState') {
        atoms[recoilValueName] = object.contents;
      } else {
        selectors[recoilValueName] = object.contents;
      }
    }
  }

  return (
    <div>
      <AtomComponentVisual
        componentAtomTree={componentAtomTree}
        selectedRecoilValue={selectedRecoilValue}
        atoms={atoms}
        selectors={selectors}
        setLegend={setLegend}
        setStr={setStr}
      />
      <AtomSelectorLegend
        selectedRecoilValue={selectedRecoilValue}
        setSelectedRecoilValue={setSelectedRecoilValue}
        atoms={atoms}
        selectors={selectors}
        legend={legend}
        str={str}
      />
    </div>
  );
};

export default AtomComponentVisualContainer;
