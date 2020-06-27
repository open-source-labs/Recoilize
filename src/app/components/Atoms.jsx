import React from 'react';

const Atoms = ({ snapshots }) => {
  // array of "atoms"
  const listOfAtoms = snapshots.slice(1).reduce((acc, curSnap) => {
    // pushing stringify "atom" into accumulator
    acc.push(<li>{JSON.stringify(curSnap.arr)}</li>);
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
