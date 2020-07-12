import React, { useState, useEffect } from 'react';
import AtomComponentVisual from '../../components/AtomComponentVisual'
import AtomSelectorLegend from '../../components/AtomSelectorLegend'

const AtomComponentVisualContainer = ({ componentAtomTree, filteredSnapshot }) => {
  console.log(filteredSnapshot, 'filteredSnapshot')
  // think i need to put the atoms and selectors in a useState

  // will need its own state for current atom/ selector
  const [selectedRecoilValue, setSelectedRecoilValue] = useState(null);



  

  return (
    <div>
      <AtomComponentVisual componentAtomTree={componentAtomTree}  />
      <AtomSelectorLegend />
    </div>
  )
}

export default AtomComponentVisualContainer;