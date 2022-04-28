/* eslint-disable prettier/prettier */
import React from 'react';

const CodeResults = props => {
const { evaluatedCode } = props;
  return (
    <div className='console-output'>
      {evaluatedCode}
    </div>
  )
}

export default CodeResults;