/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import Editor from './Editor';
import SelectorsButton from './SelectorsButton';
import {useAppSelector} from '../../state-management/hooks';
import {selectAtomsAndSelectorsState} from '../../state-management/slices/AtomsAndSelectorsSlice';
import './testing.css';
import {atom, selector} from 'recoil';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


const Testing = () => {
  // retrieve snapshotHistory State from Redux Store
  const snapshotHistory = useAppSelector(
      state => state.snapshot.snapshotHistory,
  );
  
  // it seems that converting everything to state fixes most of our asynchronicity problems? -- need to reevaluate.
  // go get the current collection of atoms and selectors.
  const [ theObject, setTheObject ] = useState(JSON.parse(
    JSON.stringify(useAppSelector(selectAtomsAndSelectorsState)),
    ));
      
  // extract what we need as state from the object of atoms/selectors that we went and grabbed.
  const [ selectorsFnAsStrings, setSelectorsFnAsStrings ] = useState(theObject.atomsAndSelectors.$selectors);
  const [ atoms, setAtoms ] = useState(theObject.atomsAndSelectors.atoms);
  const [ selectors, setSelectors ] = useState(theObject.atomsAndSelectors.selectors)
      
  const madeAtoms = {};

  //hard coded atom for testing purposes - feel free to delete.
  const currentPlayer = atom({
    key: 'currentPlayer',
    default: 'X'
  });

  // for testing purposes to render the current player on testing GUI
  const current = useRecoilValue(currentPlayer);
  
  // convert the stringified version of selector set and get properties back to functions
  const selectorsClone = JSON.parse(JSON.stringify(selectorsFnAsStrings));

  const createdSelectors = {};
  selectors.forEach(selectorKey => {
    // iterate through deep clone of selectors as strings and turn all stringed set/get functions into working functions.
    if (selectorsClone[selectorKey]['set']) selectorsClone[selectorKey]['set'] = eval('(' + selectorsClone[selectorKey]['set'] + ')');
    if (selectorsClone[selectorKey]['get']) {
      selectorsClone[selectorKey]['get'] = eval('(' + selectorsClone[selectorKey]['get'] + ')')
    } else {
      //every thing must have a get, no matter what (invoking selector on a selectorsClone value without get will result in a fail)
      selectorsClone[selectorKey]['get'] = ({get}) => {return};
    }
    createdSelectors[selectorKey] = selector(selectorsClone[selectorKey]);
  });
  const [madeSelectors, setMadeSelectors] = useState(createdSelectors);

  console.log('createdSelectors ', createdSelectors)
  console.log('made Selectors ', madeSelectors)

// tester to make sure that we do have a working selector from our state object.
const nextPlayerSetter = useSetRecoilState(madeSelectors['nextPlayerSetSelector'])

const [javascript, setJavascript] = useState('');

  return (
    //invoking an onclick to test out the fact that our selector works and is using the selector that WE MADE from our object.
   <div className='testing-container'>
     <div>
       {/* requires a parameter to be passed in, regardless of whether or not it's used. */}
       <button onClick={() => nextPlayerSetter(1)}>HELLO!</button>
       <h1>{current}</h1>
       <SelectorsButton
       key='selectors button'
       madeSelectors={madeSelectors}
       atoms={atoms}
       selectorsFnAsStrings={selectorsFnAsStrings}
       selectors={selectors}
       />
     </div>
     <div>
      {/* component that renders the expect test */}
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
