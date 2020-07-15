import React, {useState} from 'react';
import AtomComponentVisual from '../../components/AtomComponent';
import AtomSelectorLegend from '../../components/AtomSelectorLegend';
import {
  componentAtomTree,
  filteredSnapshot,
  atom,
  selector,
} from '../../../types';

interface fooBar {
  filteredCurSnap: filteredSnapshot;
  componentAtomTree: componentAtomTree;
}

const AtomComponentVisualContainer: React.FC<fooBar> = ({
  filteredCurSnap,
  componentAtomTree,
}) => {
  const [selectedRecoilValue, setSelectedRecoilValue] = useState([]);

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
      />
      <AtomSelectorLegend
        selectedRecoilValue={selectedRecoilValue}
        setSelectedRecoilValue={setSelectedRecoilValue}
        atoms={atoms}
        selectors={selectors}
      />
    </div>
  );
};

export default AtomComponentVisualContainer;
