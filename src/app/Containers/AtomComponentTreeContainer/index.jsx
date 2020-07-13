import React, { useState, useEffect } from 'react';
import AtomComponentVisual from '../../components/AtomComponentVisual'
import AtomSelectorLegend from '../../components/AtomSelectorLegend'

const AtomComponentVisualContainer = ({ componentAtomTree, filteredSnapshot }) => {

  // will need its own state for current atom/ selector
  const [selectedRecoilValue, setSelectedRecoilValue] = useState([]);
  console.log(filteredSnapshot)


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
      <AtomComponentVisual componentAtomTree={componentAtomTree} filteredSnapshot={filteredSnapshot} selectedRecoilValue={selectedRecoilValue} atoms={atoms} selectors={selectors} />
      <AtomSelectorLegend filteredSnapshot={filteredSnapshot} setSelectedRecoilValue={setSelectedRecoilValue} atoms={atoms} selectors={selectors} />
    </div>
  )
}

export default AtomComponentVisualContainer;