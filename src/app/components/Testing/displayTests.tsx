/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

const DisplayTests: React.FC<any> = (props) => {
  const {currentSelector, currentAtom, currentAtomValue, toBeValue, setToBeValue, parameters, setParameters} = props;

  // use displayedSelector to check if a new selector is chose
  // if truthy, reassign parameters and toBeValue to empty strings
  // reassign displayedSelector to the current value of

  if (currentSelector.length){

    // update the toBe value with wahtever to
    function handleToBeChange(e) {
      setToBeValue(e.target.value);
    };

    function handleParameterChange(e) {
      setParameters(e.target.value);
      console.log('E.TARGET.VAL: ', e.target.value);
    }

    return (
      <div>
        <p>Atom ({currentAtom}): <strong>{currentAtomValue}</strong></p>
        <p>Selector: <strong>{currentSelector}</strong></p>
        <form>
          <label htmlFor='expected'>To Be: </label>
          <input type='text' id='expected' name='expected' onChange={handleToBeChange}></input>
          
          <label htmlFor='parameters'>Parameters: </label>
          <input type='text' id='parameters' name='parameters' onChange={handleParameterChange}></input>
        </form>
          
        <p>expect({currentAtom}).toBe({toBeValue})</p>
      </div>
    );
  }
  else {
    return (
      <div>      
      </div>
    );
  }
};

export default DisplayTests;
