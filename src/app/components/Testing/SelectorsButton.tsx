/* eslint-disable prettier/prettier */
import React from 'react';
import {useAppSelector} from '../../state-management/hooks';
import {selectAtomsAndSelectorsState} from '../../state-management/slices/AtomsAndSelectorsSlice';

const SelectorsButton: React.FC = () => {
  // const selectorArray = useAppSelector(state => {
  //   return state;
  // });
  // console.log(
  //   'state in SelectorButton: ',
  //   selectorArray.atomsAndSelectors.atomsAndSelectors,
  // );

  const object = useAppSelector(selectAtomsAndSelectorsState);
  const atomsAndSelectorsObject = object.atomsAndSelectors;
  const selectorsArray = atomsAndSelectorsObject.selectors;

  const selectors: JSX.Element[] = [];
  selectorsArray.forEach((selector, index) => {
    selectors.push(<option>{selector}</option>);
  });
  
  return (
    <div>
      <label htmlFor='selectors'>Selectors: </label>
      <select name='selectors'>{selectors}</select>
    </div>
  );
};
 
export default SelectorsButton;

{/* <label for="dog-names">Choose a dog name:</label>
<select name="dog-names" id="dog-names"></select>
<option value="rigatoni">Rigatoni</option>
<option value="dave">Dave</option>
<option value="pumpernickel">Pumpernickel</option>
<option value="reeses">Reeses</option> */}
