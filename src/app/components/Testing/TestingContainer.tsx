/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import Editor from './Editor';
// import { useAppSelector } from '../../state-management/hooks';
import SelectorsButton from './SelectorsButton';
// import { atomsArray, $selectors } from './atomsAndSelectors';
// import {useAppSelector} from '../../state-management/hooks';
// import {selectAtomsAndSelectorsState} from '../../state-management/slices/AtomsAndSelectorsSlice';

import './testing.css';
// grab array of all selectors - snapshot history is stored in the Redux store
  // this will store in a dropdown
// import {atom, selector} from 'recoil';
// import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// assign the selectors and atoms objects to a variables to use for the creation of recoil atoms and selectors


// grab array of all atoms
  // this will store in a drop down?



const Testing = () => {
const [javascript, setJavascript] = useState(``);
  // const object = JSON.parse(
  //   JSON.stringify(useAppSelector(selectAtomsAndSelectorsState)),
  // );

//   console.log('THE OBJECT: ', object);
//   const { $selectors, atoms, selectors } = object.atomsAndSelectors;
//   const madeAtoms = {};
//   const madeSelectors = {};

//   const currentPlayer = atom({
//     key: 'currentPlayer',
//     default: 'X'
//   });

// selectors.forEach(selectorKey => {
//   // create a new recoil atom for each element in the atomsArray and export the return value
//   console.log('before conversion ', $selectors[selectorKey])
//   if ($selectors[selectorKey]['get']) $selectors[selectorKey]['get'] = eval('(' + $selectors[selectorKey]['get'] + ')');
//   if ($selectors[selectorKey]['set']) $selectors[selectorKey]['set'] = eval('(' + $selectors[selectorKey]['set'] + ')');
//   console.log('after conversion ', $selectors[selectorKey])
//   madeSelectors[selectorKey] = selector($selectors[selectorKey])
// });

//   const testCurrentPlayer = useRecoilValue(currentPlayer);
//   const testSelector = useSetRecoilState(madeSelectors['nextPlayerSetSelector']);
  
  // console.log('Before', testCurrentPlayer);
  // testSelector('');
  // console.log('After', testCurrentPlayer);
  // retrieve snapshotHistory State from Redux Store
  // const snapshotHistory = useAppSelector(
  //     state => state.snapshot.snapshotHistory,
  // );
  
// console.log('this is from the testing container and has the imported atoms/selectors ', atomsArray, $selectors)
  // check what is in our snapshotHistory
  // looking for a property that specifies whether each key is an atom or a selector
  //console.log('snapshot History: ', snapshotHistory);
  // boardState.set__proto__

  return (
    
   <div className='testing-container'>
     <div>
       <h1>Testing</h1>
       <SelectorsButton
       key='selectors button'
       />
     </div>
     <Editor
        onChange={setJavascript}
        value={javascript}
     />
   </div>
  )
};

export default Testing;

//when you select a selector
 // we have to grab that selector and save it to a variable with useSetRecoilState.
 // 


// Jester testing convo ---
