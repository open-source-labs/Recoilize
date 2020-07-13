import React, { useState, useEffect } from 'react';
import AtomComponentVisual from '../../components/AtomComponentVisual'
import AtomSelectorLegend from '../../components/AtomSelectorLegend'

const AtomComponentVisualContainer = ({ componentAtomTree, filteredSnapshot }) => {

  // will need its own state for current atom/ selector
  const [selectedRecoilValue, setSelectedRecoilValue] = useState(null);


  
  

  return (
    <div>
      <AtomComponentVisual componentAtomTree={componentAtomTree} filteredSnapshot={filteredSnapshot} selectedRecoilValue={selectedRecoilValue} />
      <AtomSelectorLegend filteredSnapshot={filteredSnapshot} setSelectedRecoilValue={setSelectedRecoilValue}/>
    </div>
  )
}

export default AtomComponentVisualContainer;