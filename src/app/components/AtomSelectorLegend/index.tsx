import React from 'react';

interface AtomSelectorLegendProps {
  setSelectedRecoilValue: React.Dispatch<React.SetStateAction<any[]>>;
  atoms: object;
  selectors: object;
  selectedRecoilValue: any[];
  str: any;
}
const AtomSelectorLegend: React.FC<AtomSelectorLegendProps> = ({
  setSelectedRecoilValue,
  atoms,
  selectors,
  selectedRecoilValue,
  str,
}) => {
  const selectorList: JSX.Element[] = [];
  const atomList: JSX.Element[] = [];
  Object.entries(selectors).forEach(([selectorName, value], i) => {
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
  const legendTextArray: any = [];
  str.forEach((element: any) => {
    legendTextArray.push(
      <div>
        {element}
        <br />
      </div>,
    );
  });
  if (str.length !== 0) {
    return (
      <div className="AtomSelectorLegend">
        <div>{legendTextArray}</div>
      </div>
    );
  } else {
    return (
      <div className="AtomSelectorLegend">
        <button
          onClick={() => {
            const menu = document.querySelector('#hidden');
            menu.classList.toggle('minimize');
          }}
          className="minimizeButton">
          Visibility
        </button>
        <div id="hidden">
          <div>
            <span
              style={{fontSize: '14px', fontWeight: 'bold', marginTop: '10px'}}>
              Atoms
            </span>
            {atomList}
          </div>
          <div>
            <span
              style={{fontSize: '14px', fontWeight: 'bold', marginTop: '10px'}}>
              Selectors
            </span>
            {selectorList}
          </div>
        </div>
      </div>
    );
  }
};

export default AtomSelectorLegend;
