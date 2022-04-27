/* eslint-disable prettier/prettier */
import React from 'react';
import {useState} from 'react';
//import our css stylings from codemirror
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import CodeResults from './CodeResults'
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { selector, atom } from 'recoil';
import { dummySelector, dummyAtom } from './dummySelector';
const Editor = props => {//loadedSelector
const { value, onChange, loadButton, selectorsFnAsStrings, madeAtoms, toBeValue, currentAtom, currentAtomValue, currentSelector, madeSelectors } = props;
// expect two more prop drilling variables: expect (atom's current value) amd user inputted to be (atom's expected value)


let mySelector;
let comparisonValue;
// create the selectors and atoms for use in this editor associated with the drop down selection
if (madeSelectors[currentSelector]){
  mySelector = useSetRecoilState(madeSelectors[currentSelector]);
  //console.log('Current Selector we are using: ', madeSelectors[currentSelector]);
  comparisonValue = useRecoilValue(madeAtoms[currentAtom]);
  //console.log('Comparison Value: ', comparisonValue);
} else {
  mySelector = useSetRecoilState(dummySelector);
  comparisonValue = useRecoilValue(dummyAtom);
}




//console.log('my Selector is this ', mySelector);
const [ evaluatedCode, setEvaluatedCode ] = useState('Run code here...');
// if (madeSelectors[currentSelector]){
//   const mySelector = useSetRecoilState(madeSelectors[currentSelector]);
//   console.log('MySelectormajig: ', mySelector);
// }
function handleRunCodeClick () {
  try {
    console.log(madeAtoms);
    console.log('DO WE EXIST? : ', madeAtoms.currentPlayer);
    //console.log('My Selector: ', mySelector);
    // save the selector that we care about as a variable so that we can invoke it.
    // save the atom that we care about as a variable so that we can have it.
    // get the value of the atom after invocation through useRecoilValue and compare that to the toBeValue
    console.log('SELECTIFY: ', mySelector);
    mySelector();
    console.log('I INVOKED');
    // grab comparisonValue from updated atoms
    if (toBeValue !== comparisonValue) {
      setEvaluatedCode("THE TEST HAS FAILED");
    }
    else {
      setEvaluatedCode('IT MATCHES, BRO!');
    }

    //loadedSelector();
    //setEvaluedCode to the atom in question
    // get the expect/tobe from drop down.
    // invoke our selector as loadedSelector and display the results.
    
  }
  catch(err) {
    console.log('handleRunCodeClick error message: ', err, err.message);
    setEvaluatedCode(err.message);
  }

  // try {
  //   if (valueAsString){
  //     let evalCode = eval(valueAsString);
  //     if (evalCode === undefined) evalCode = 'undefined';
  //     if (evalCode === null) evalCode = 'null';
  //     setEvaluatedCode(evalCode);
  //   } else {
  //     setEvaluatedCode('');
  //   }
  // } catch (err) {
  //   setEvaluatedCode(err.message);
  // }
}

function handleChange (editor, data, value) {
  onChange(value);
}

  return (
    // <>
      <div className='editor-container'>
        <div>
          <ControlledEditor
          className='code-mirror-wrapper'
          onBeforeChange={handleChange}
          value={value}
          options={{
            lineWrapping: true,
            mode: 'javascript',
            lineNumbers: true,
            lint: true,
            //indentUnit: 2,
            autoCloseBrackets: true,
            theme: 'dracula',
            // smartIndent: tru,
          }}
          />
        </div>

        <div>
        <button className='run-code' onClick={() => handleRunCodeClick(value)}>Run Code</button>
        </div>

        <CodeResults
        evaluatedCode={evaluatedCode}
        />

      </div>
  )
}

export default Editor;