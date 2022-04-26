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

const Editor = props => {
const { value, onChange, selectorsFnAsStrings, loadedSelector } = props;
// expect two more prop drilling variables: expect (atom's current value) amd user inputted to be (atom's expected value)

const [ evaluatedCode, setEvaluatedCode ] = useState('Run code here...');

function handleClick () {
  try {
    console.log('handleclick still works');
    //loadedSelector();
    //setEvaluedCode to the atom in question
    // get the expect/tobe from drop down.
    // invoke our selector as loadedSelector and display the results.
    
  }
  catch(err) {
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
        <button className='run-code' onClick={() => handleClick(value)}>Run Code</button>
        </div>

        <CodeResults
        evaluatedCode={evaluatedCode}
        />

      </div>
  )
}

export default Editor;