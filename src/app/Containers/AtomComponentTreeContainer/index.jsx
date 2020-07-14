import React, {useState} from 'react';
import AtomComponentVisual from '../../components/AtomComponentVisual';
import AtomSelectorLegend from '../../components/AtomSelectorLegend';

const AtomComponentVisualContainer = ({
  componentAtomTree,
  filteredSnapshot,
}) => {
  const [selectedRecoilValue, setSelectedRecoilValue] = useState([]);
  const componentsWithSelectedVal = [];

  const atoms = {};
  const selectors = {};
  if (filteredSnapshot) {
    for (let [recoilValueName, object] of Object.entries(filteredSnapshot)) {
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
        filteredSnapshot={filteredSnapshot}
        selectedRecoilValue={selectedRecoilValue}
        atoms={atoms}
        selectors={selectors}
      />
      <AtomSelectorLegend
        filteredSnapshot={filteredSnapshot}
        setSelectedRecoilValue={setSelectedRecoilValue}
        atoms={atoms}
        selectors={selectors}
        componentAtomTree={componentAtomTree}
      />
    </div>
  );
};

export default AtomComponentVisualContainer;
