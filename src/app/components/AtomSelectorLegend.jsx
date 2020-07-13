import React from 'react';

const AtomSelectorLegend = ({ filteredSnapshot, setSelectedRecoilValue, atoms, selectors }) => {

  const selectorList = [];
  const atomList = [];
  Object.entries(selectors).forEach(([selectorName, value], i) => {
    selectorList.push(<li onClick={() => setSelectedRecoilValue([selectorName, 'selector'])} key={`${selectorName}${i}`}>{selectorName}: {JSON.stringify(value)}</li>)
  })
  Object.entries(atoms).forEach(([atomName, value], i) => {
    atomList.push(<li onClick={() => setSelectedRecoilValue([atomName, 'atom'])} key={`${atomName}${i}`}>{atomName}: {JSON.stringify(value)}</li>)
  })

  return (
    <div className='AtomSelectorLegend'>
      <div>
        <h4>Atoms</h4>
        <ul>
          {atomList}
        </ul>
      </div>
      <div>
        <h4>Selectors</h4>
        <ul>
          {selectorList}
        </ul>
      </div>

    </div>
  )
}

export default AtomSelectorLegend;