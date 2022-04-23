/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';

import Editor from './Editor';
import SelectorsButton from './SelectorsButton';
import {useAppSelector} from '../../state-management/hooks';
import {selectAtomsAndSelectorsState} from '../../state-management/slices/AtomsAndSelectorsSlice';
import './testing.css';
// grab array of all selectors - snapshot history is stored in the Redux store
  // this will store in a dropdown
import {atom, selector} from 'recoil';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


const Testing = () => {
const [javascript, setJavascript] = useState(``);
  const theObject = JSON.parse(
    JSON.stringify(useAppSelector(selectAtomsAndSelectorsState)),
  );
  


  const { atomsAndSelectors } = theObject;

  const { $selectors, selectors, atoms } = atomsAndSelectors;
  console.log($selectors);
  
  const madeSelectors = {};

  const currentPlayer = atom({
    key: 'currentPlayer',
    default: 'X'
  });

  const current = useRecoilValue(currentPlayer);

  const mySetSelector = selector({
    key: 'mySetSelector',
    set: ({get, set}) => {
      const val = get(currentPlayer) === 'X' ? '0' : 'X';
      set(currentPlayer, val);
      return
    },
    get: ({get}) => {
      return;
    }
  })

  const mySet = useSetRecoilState(mySetSelector);
  // const currentPlayerStateSelector = selector($nextPlayerSetSelector);
const voidFunc = ({get}) => {
  return;
}

selectors.forEach(selectorKey => {
  // create a new recoil atom for each element in the atomsArray and export the return value
  console.log('before conversion ', $selectors[selectorKey])
  if ($selectors[selectorKey]['set']) $selectors[selectorKey]['set'] = eval('(' + $selectors[selectorKey]['set'] + ')');
  if ($selectors[selectorKey]['get']) {
    $selectors[selectorKey]['get'] = eval('(' + $selectors[selectorKey]['get'] + ')')
  } else {
    $selectors[selectorKey]['get'] = voidFunc;
  }
  console.log('after conversion ', $selectors[selectorKey])
  madeSelectors[selectorKey] = selector($selectors[selectorKey])
  console.log('made selectors ', madeSelectors)
});

// retrieve snapshotHistory State from Redux Store
const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
);
  
const nextPlayerSetter = useSetRecoilState(madeSelectors['nextPlayerSetSelector'])

  return (
    
   <div className='testing-container'>
     <div>
       <button onClick={() => console.log(nextPlayerSetter(1))}>HELLO!</button>
       <h1>{current}</h1>
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
