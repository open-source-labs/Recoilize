/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { useAppSelector } from '../../state-management/hooks';

// grab array of all selectors - snapshot history is stored in the Redux store
  // this will store in a dropdown
  
// grab array of all atoms
  // this will store in a drop down?



const Testing: React.FC = () => {

  // retrieve snapshotHistory State from Redux Store
  const snapshotHistory = useAppSelector(
      state => state.snapshot.snapshotHistory,
  );
  // check what is in our snapshotHistory
  // looking for a property that specifies whether each key is an atom or a selector
  console.log('snapshot History: ', snapshotHistory);
  // boardState.set__proto__

  return (
   <div>
     Testing!
   </div>
  )
};

export default Testing;

//when you select a selector
 // we have to grab that selector and save it to a variable with useSetRecoilState.
 // 


// Jester testing convo ---
  // 
