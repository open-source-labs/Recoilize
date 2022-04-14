/* eslint-disable prettier/prettier */
import React from 'react';
//import our css stylings from codemirror
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';

const Editor = props => {

  return (
    <div className='editor-container'>
      <ControlledEditor
      className='code-mirror-wrapper'
      options={{
        lineWrapping: true,
        mode: 'javascript',
        lineNumbers: true,
        theme: 'dracula'
      }}
      />
      <button className='run-code'>Run Code</button>
    </div>
    
  )
}

export default Editor;