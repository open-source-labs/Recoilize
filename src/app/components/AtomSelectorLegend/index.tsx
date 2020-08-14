import React from 'react';

interface AtomSelectorLegendProps {
  setSelectedRecoilValue: React.Dispatch<React.SetStateAction<any[]>>;
  atoms: object;
  selectors: object;
  selectedRecoilValue: any[];
  legend: any;
  str: any;
}

const AtomSelectorLegend: React.FC<AtomSelectorLegendProps> = ({
  setSelectedRecoilValue,
  atoms,
  selectors,
  selectedRecoilValue,
  legend,
  str,
}) => {
  const selectorList: JSX.Element[] = [];
  const atomList: JSX.Element[] = [];
  Object.entries(selectors).forEach(([selectorName, value], i) => {
    console.log('selectors', selectors);
    selectorList.push(
      <div
        style={
          selectorName === selectedRecoilValue[0]
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {color: '#989898'}
        }
        className="atomLi"
        onClick={() => setSelectedRecoilValue([selectorName, 'selector'])}
        key={`${selectorName}${i}`}>
        {selectorName}: {JSON.stringify(value)}
      </div>,
    );
  });
  Object.entries(atoms).forEach(([atomName, value], i) => {
    console.log('atoms:', atoms);
    atomList.push(
      <div
        style={
          atomName === selectedRecoilValue[0]
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {color: '#989898'}
        }
        className="selectorLi"
        onClick={() => setSelectedRecoilValue([atomName, 'atom'])}
        key={`${atomName}${i}`}>
        {atomName}: {JSON.stringify(value)}
      </div>,
    );
  });

  console.log('atomList', atomList);
  console.log('selectorList', selectorList);

  if (!legend) {
    return (
      <div className="AtomSelectorLegend" style={{height: 400, width: '10%'}}>
        <div>{str}</div>
      </div>
    );
  } else {
    return (
      <div className="AtomSelectorLegend">
        <div>
          <h4>Atoms</h4>
          {atomList}
        </div>
        <div>
          <h4>Selectors</h4>
          {selectorList}
        </div>
      </div>
    );
  }
};

export default AtomSelectorLegend;
