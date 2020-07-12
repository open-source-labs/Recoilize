import React from 'react';

const AtomSelectorLegend = ({ filteredSnapshot }) => {

  const selectors = {};
  const atoms = {};

  if (filteredSnapshot) {
    for (let [recoilValueName, object] of Object.entries(filteredSnapshot)) {
      if (object.type === 'RecoilState') {
        atoms[recoilValueName] = object.contents;
      } else {
        selectors[recoilValueName] = object.contents;
      }
    }
  }

  const selectorList = [];
  const atomList = [];
  Object.entries(selectors).forEach(([selectorName, value], i) => {
    selectorList.push(<li key={`${selectorName}${i}`}>{selectorName}: {JSON.stringify(value)}</li>)
  })
  Object.entries(atoms).forEach(([atomName, value], i) => {
    atomList.push(<li key={`${atomName}${i}`}>{atomName}: {JSON.stringify(value)}</li>)
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