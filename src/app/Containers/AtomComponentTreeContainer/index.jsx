import React, {useState} from 'react';
import AtomComponentVisual from '../../components/AtomComponentVisual'
import AtomSelectorLegend from '../../components/AtomSelectorLegend'

const AtomComponentVisualContainer = ({ currentSnapshot }) => {

  // will need its own state for current atom/ selector
  const [selectedRecoilValue, setSelectedRecoilValue] = useState(null);

  return (
    <div>
      <AtomComponentVisual currentSnapshot ={currentSnapshot} />
      <AtomSelectorLegend  currentSnapshot={currentSnapshot}/>
    </div>
  )
}

export default AtomComponentVisualContainer;