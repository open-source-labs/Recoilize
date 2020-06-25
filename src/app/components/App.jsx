import React, { useState } from 'react';

function App() {

  const [counter, updateCounter] = useState(0);

  const incrementCounter = () => {
    updateCounter(counter++);
  }

  const decrementCounter = () => {
    updateCounter(counter--);
  } 

  return (
    <div style={{backgroundColor: 'green'}}>
      React says hello
      {/* <p>{counter}</p>
      <button onClick={incrementCounter}>+</button>
      <button onClick={decrementCounter}>-</button> */}
    </div>
  );
}

export default App;