import React from 'react';

/////////////////////////////////////////////////
// NOT FUNCTIONING ONLY WORKED WITH DUMMY DATA //
/////////////////////////////////////////////////

const Atoms = ({ snapshotHistory }) => {
  // array of "atoms" - from dummy-data
  const listOfAtoms = snapshotHistory.reduce((acc, curSnap, i) => {
    // pushing stringify "atom" into accumulator - from dummy-data
    acc.push(<li key={i}>{JSON.stringify(curSnap.arr)}</li>);
    return acc;
  }, []);
  return (
    <div className='Atoms'>
      <p>Atoms box</p>
      {listOfAtoms}
    </div>
  );
};

export default Atoms;
