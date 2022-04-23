/* eslint-disable prettier/prettier */
import React from 'react';

const SelectorsButton: React.FC<any> = (props) => {

  const { $selectors, selectors, atoms } = props;
  console.log('selector button props ', props);

  // completely eliminated all need for any object shenanigans or redux imports through prop drilling.

  const handleChange = (item) => {
    const selectorKey = item.options[item.selectedIndex].value;
    console.log(selectorKey);
  }
  
  //relabled and used a value property to capture the value on an on change above - you can now find the keys. Function needs to be completed though.
  const HTMLselectorArray: JSX.Element[] = [];
  selectors.forEach((selector, i) => {
    HTMLselectorArray.push(<option key={i} value={selector}>{selector}</option>);
  });
  
  return (
    <div>
        <label htmlFor='selectors'>Selectors: </label>
        <select name='selectors' id='selectors' onChange={() => handleChange(document.querySelector('#selectors'))}>{HTMLselectorArray}</select>
    </div>
  );
};
 
export default SelectorsButton;
