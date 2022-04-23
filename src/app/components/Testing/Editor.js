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
const { value, onChange } = props;

const [evaluatedCode, setEvaluatedCode] = useState('Run code here...');

function handleClick (valueAsString) {
  try {
    if (valueAsString){
      let evalCode = eval(valueAsString);
      if (evalCode === undefined) evalCode = 'undefined';
      if (evalCode === null) evalCode = 'null';
      setEvaluatedCode(evalCode);
    } else {
      setEvaluatedCode('');
    }
  } catch (err) {
    setEvaluatedCode(err.message);
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
          smartIndent: true,
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