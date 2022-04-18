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
// import './testing.css';
const Editor = props => {
const { value, onChange } = props;

const [evaluatedCode, setEvaluatedCode] = useState('Run code here...');

function handleClick (valueAsString) {
  if (valueAsString){
    const evalCode = eval(valueAsString);
    console.log(evalCode);
    if (evalCode){
      setEvaluatedCode(eval(valueAsString))
    } else {
      setEvaluatedCode('Error');
    }
  }
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
          indentUnit: 2,
          autoCloseBrackets: true,
          theme: 'dracula',
          indentUnit: 2,
          
          smartIndent: true,
        }}
        />
        </div>
        <div>
        <button className='run-code' onClick={() => handleClick(value)}>Run Code</button>
        </div>
      {/* </div>
      <div> */}
        <CodeResults
        evaluatedCode={evaluatedCode}
        />
      </div>
    // </>
  )
}

export default Editor;