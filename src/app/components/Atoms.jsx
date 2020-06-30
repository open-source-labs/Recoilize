import React from 'react';

const Atoms = ({snapshots}) => {
  // array of "atoms"
  const listOfAtoms = snapshots.reduce((acc, curSnap, i) => {
    // pushing stringify "atom" into accumulator
    acc.push(<li key={i}>{JSON.stringify(curSnap.arr)}</li>);
    return acc;
  }, []);
  return (
    <div className="Atoms">
      <p>Atoms box</p>
      {listOfAtoms}
    </div>
  );
};

export default Atoms;
