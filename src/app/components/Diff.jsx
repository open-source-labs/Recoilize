// renders the difference between the most recent state change and the previous
import React from 'react';

const Diff = ({oldSnap, newSnap}) => {
  // string of "atoms"
  const oldSnapString = JSON.stringify(oldSnap);
  // string of "atoms"
  const newSnapString = JSON.stringify(newSnap);
  return (
    <div className='Diff'>
      <p>Diff box</p>
      <li>{oldSnapString}</li>
      <li>{newSnapString}</li>
    </div>
  )
}

export default Diff;