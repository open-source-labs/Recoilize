import React from 'react';
import {atom, selector} from '../../types';

interface AtomSelectorLegendProps {
  setSelectedRecoilValue: React.Dispatch<React.SetStateAction<any[]>>;
  atoms: atom;
  selectors: selector;
  selectedRecoilValue: string[];
  str: string[];
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
  const legendTextArray: JSX.Element[] = [];
  str.forEach((element: string) => {
    legendTextArray.push(
      <div>
        {element}
        <br />
      </div>,
    );
  });

  // legend when a component is clicked on. state pertaining to that component
  const specificLegend: JSX.Element = (
    <div className="AtomSelectorLegend">
      <div>{legendTextArray}</div>
    </div>
  );

  // general legend that shows everything
  const generalLegend: JSX.Element = (
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

  /* a component is clicked? then render specific legend pertaining to that component.
     if not, render general legend */
  return <>{str.length ? specificLegend : generalLegend}</>;
};

export default AtomSelectorLegend;
