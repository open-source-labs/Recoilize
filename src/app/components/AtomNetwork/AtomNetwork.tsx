import React, {useEffect, useState} from 'react';
import {filteredSnapshot} from '../../../types';
import AtomNetworkLegend from './AtomNetworkLegend';
import AtomNetworkVisual from './AtomNetworkVisual';

interface AtomNetworkProps {
  // filteredCurSnap is an object of atom or selector names as keys and
  // an object as their value.
  filteredCurSnap: filteredSnapshot;
}

//Create the container passing in the JSX props for each individual component
const AtomNetwork: React.FC<AtomNetworkProps> = ({filteredCurSnap}) => {
  // an array of atoms and selector sub
  const atomAndSelectorArr = Object.entries(filteredCurSnap);

  // state hook for search value for atom network
  const [searchValue, setSearchValue] = useState('');

  console.log('in new atom netowrk');

  return (
    <div className="networkContainer">
      <AtomNetworkVisual
        filteredCurSnap={filteredCurSnap}
        searchValue={searchValue}
      />
      <AtomNetworkLegend
        atomAndSelectorArr={atomAndSelectorArr}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};

export default AtomNetwork;
