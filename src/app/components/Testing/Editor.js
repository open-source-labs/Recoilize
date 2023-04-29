/* eslint-disable prettier/prettier */
import React from 'react';
import {useState} from 'react';
// import our css stylings from codemirror
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import CodeResults from './CodeResults'
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { selector, atom } from 'recoil';
import { dummySelector, dummyAtom } from './dummySelector';
const Editor = props => {
const { value, onChange, loadButton, selectorsFnAsStrings, madeAtoms, toBeValue, currentAtom, currentAtomValue, currentSelector, setCurrentSelector, madeSelectors, parameters } = props;
// expect two more prop drilling variables: expect (atom's current value) amd user inputted to be (atom's expected value)
const [hasRendered, setHasRendered] = useState(false);
let mySelector;
let comparisonValue;
// create the selectors and atoms for use in this editor associated with the drop down selection
if (madeSelectors[currentSelector]){
  mySelector = useSetRecoilState(madeSelectors[currentSelector]);

  if (!hasRendered){
    
    mySelector()
    setHasRendered(true);
  }
  comparisonValue = useRecoilValue(madeAtoms[currentAtom]);

} else {
  mySelector = useSetRecoilState(dummySelector);
  comparisonValue = useRecoilValue(dummyAtom);
}


const [ evaluatedCode, setEvaluatedCode ] = useState('Run code here...');

function handleRunCodeClick () {
  try {
    if (toBeValue !== comparisonValue) {
      setEvaluatedCode(`❌ Expected ${currentAtom} to be ${toBeValue} and Received ${comparisonValue}`);
    }
    else {
      setEvaluatedCode(`✅ Expected ${currentAtom} to be ${toBeValue} and Received ${comparisonValue}`);
    }
  }
  catch(err) {
    setEvaluatedCode(err.message);
  }
}

function handleChange (editor, data, value) {
  onChange(value);
}

  return (
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