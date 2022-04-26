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


// use effect.
  const [ theObject, setTheObject ] = useState(JSON.parse(
    JSON.stringify(useAppSelector(selectAtomsAndSelectorsState)),
  ));
  
  const [currentAtom, setCurrentAtom] = useState('');
  const [currentAtomValue, setCurrentAtomValue] = useState('');
  const [toBeValue, setToBeValue] = useState('');
  const [parameters, setParameters] = useState('');

  
  const madeAtoms = {};

  console.log('snapshot historyyyyyy: ', snapshotHistory);
  // iterate through the key values in the atoms array in our snapshotHistory and generate new atoms for our local recoil test state
  snapshotHistory[snapshotHistory.length - 1].atomsAndSelectors.atoms.forEach(theAtom => {
    madeAtoms[theAtom] = atom({
    key: theAtom,
    default: snapshotHistory[snapshotHistory.length - 1].filteredSnapshot[theAtom].contents,
  })});
  console.log('Made Atoms: ', madeAtoms);
  // it seems that converting everything to state fixes most of our asynchronicity problems? -- need to reevaluate.
  // go get the current collection of atoms and selectors.

  // extract what we need as state from the object of atoms/selectors that we went and grabbed.
  const [ selectorsFnAsStrings, setSelectorsFnAsStrings ] = useState(theObject.atomsAndSelectors.$selectors);
  const [ atoms, setAtoms ] = useState(theObject.atomsAndSelectors.atoms);
  const [ selectors, setSelectors ] = useState(theObject.atomsAndSelectors.selectors)
  
  
  // let selectorsClone = JSON.parse(JSON.stringify(selectorsFnAsStrings));
  // selectors.forEach(selectorKey => {
  //   if (!selectorsClone[selectorKey]['get']) {
  //     selectorsClone[selectorKey]['get'] = voidGetterFuncString;
  //   }
  // });
  // setSelectorsFnAsStrings(selectorsClone);
    
  //hard coded atom for testing purposes - feel free to delete.

  // for testing purposes to render the current player on testing GUI
  
  // convert the stringified version of selector set and get properties back to functions
  let selectorsClone = JSON.parse(JSON.stringify(selectorsFnAsStrings));

  const createdSelectors = {};
  selectors.forEach(selectorKey => {
    // if (madeSelectors[selectorKey]) return;
    console.log('this is happening again in the selectors. for each')
    // iterate through deep clone of selectors as strings and turn all stringed set/get functions into working functions.
    if (selectorsClone[selectorKey]['set']) selectorsClone[selectorKey]['set'] = eval('(' + selectorsClone[selectorKey]['set'] + ')');
    if (selectorsClone[selectorKey]['get']){
      selectorsClone[selectorKey]['get'] = eval('(' + selectorsClone[selectorKey]['get'] + ')');
    } else {
      selectorsClone[selectorKey]['get'] = ({ get }) => {return};
    }
    createdSelectors[selectorKey] = selector(selectorsClone[selectorKey]);
  });

 


  const [ madeSelectors, setMadeSelectors ] = useState(createdSelectors);

  console.log('MADE SELECTORS: ', madeSelectors);
  // chosen selector piece of state that tells our container which piece of state has been chosen, and therefore will be drilled down (chosenSelector is just a string)
  const [ currentSelector, setCurrentSelector ] = useState(''); 
  const [ loadedSelector, setLoadedSelector ] = useState(() => {return});
  // use effect hook that, on update, grabs the relevant selector from madeSelectors, and the relevant String version, and drills them down to be used and displayed.
  const [javascript, setJavascript] = useState('');
  
  // useEffect(()=> {
  // //console.log('hello');
  // //   // setJavascript(selectorsFnAsStrings[chosenSelector]);
  // //   // console.log("THIS IS WHAT WE WANT TO SHOW UP ", selectorsFnAsStrings[chosenSelector])
  // //   // setJavascript(javascript + "hello does this wrok");
  // if (currentSelector) {
  //   setLoadedSelector(useSetRecoilState(madeSelectors[currentSelector]))
  // }
  // console.log('Loaded Selector: ', loadedSelector);
  // })
  // once we get atoms working, we will use the same process to display atoms.


  // tester to make sure that we do have a working selector from our state object.
  //const nextPlayerSetter = useSetRecoilState(madeSelectors['nextPlayerSetSelector'])


  return (
    //invoking an onclick to test out the fact that our selector works and is using the selector that WE MADE from our object.
   <div className='testing-container'>
     <div>
       {/* requires a parameter to be passed in, regardless of whether or not it's used. */}
       <button>Load</button>
       <h1>Selector Modular Architecture Visibility</h1>
       <SelectorsButton
       key='selectors button'
       madeSelectors={madeSelectors}
       currentAtom={currentAtom}
       setCurrentAtom={setCurrentAtom}
       currentAtomValue={currentAtomValue}
       setCurrentAtomValue={setCurrentAtomValue}
       toBeValue={toBeValue}
       setToBeValue={setToBeValue}
       parameters={parameters}
       setParameters={setParameters}
       atoms={atoms}
       selectors={selectors}
       currentSelector={currentSelector}
       setCurrentSelector={setCurrentSelector}
       onChange={setJavascript}
       selectorsFnAsStrings={selectorsFnAsStrings}
       loadedSelector={loadedSelector}
       setLoadedSelector={setLoadedSelector}
       />
     </div>
     <div>
      {/* component that renders the expect test */}
     </div>
     <Editor
        onChange={setJavascript}
        selectorsFnAsStrings={selectorsFnAsStrings}
        madeSelectors={madeSelectors}
        madeAtoms={madeAtoms}
        value={javascript}
        loadedSelector={loadedSelector}
     />
   </div>
  )
};

export default Testing;
