/* eslint-disable prettier/prettier */
import React from 'react';
import DisplayTests from './displayTests';

const SelectorsButton: React.FC<any> = props => {

  const { selectorsFnAsStrings, selectors, atoms, setChosenSelector, onChange } = props;

  // completely eliminated all need for any object shenanigans or redux imports through prop drilling.

  const handleChange = (item) => {
    const selectorKey = item.options[item.selectedIndex].value;
    console.log('handleChange, selectorKey: ', selectorKey);
    // update state with the chosen Selector
    setChosenSelector(selectorKey);
    const capturedFnString = selectorsFnAsStrings[selectorKey];
    let { key, set, get } = capturedFnString;

    const parser = (string) => {
      // start a slice at _ and end at ; for each, the get and the set.
      if (!string) return;
      const firstPortion = string.slice(0, string.indexOf(';'));
      const secondPortion = string.slice(string.indexOf(';') + 1, string.length);
      let newFirstPortion = '';
      if (firstPortion.includes('get')) newFirstPortion += ' get ';
      if (firstPortion.includes('set')) newFirstPortion += ' set ';
      //console.log('firstPortion ,', firstPortion)
      //console.log('newFirstPortion ', newFirstPortion);
      return `{ ${newFirstPortion} } => { ${secondPortion}`
    }
    //first portion of string is from 0 to ;
    const displayedSelector = 
    `Chosen selector:
  ${key}: {
    get: ${parser(get)}, 
    set: ${parser(set)},
  }`
    //maybe need to parse function to use present as a correct string.
    onChange(displayedSelector);
    // onChange("displayedSelector");
    // console.log('handleChange, selectorKey: ', selectorKey);
  }
  
  //relabeled and used a value property to capture the value on an on change above - you can now find the keys. Function needs to be completed though.
  const HTMLselectorArray: JSX.Element[] = [];
  selectors.forEach((selector, i) => {
    HTMLselectorArray.push(<option key={i} value={selector}>{selector}</option>);
  });
  
  return (
    <div>
      <div>
          <label htmlFor='selectors'>Selectors: </label>
          <select name='selectors' id='selectors' onChange={() => handleChange(document.querySelector('#selectors'))}>{HTMLselectorArray}</select>
      </div>
      <div>
        <DisplayTests/>
      </div>
    </div>
  );
};
 
export default SelectorsButton;
