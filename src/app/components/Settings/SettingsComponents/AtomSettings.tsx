import React, {useState} from 'react';
import {filterArray} from '../../SnapshotList/index'; // array of atoms/selectors
import {Multiselect} from 'multiselect-react-dropdown';
import {stateSnapshot} from '../../../types';

interface AtomSettingsProps {
  snapshotHistory: stateSnapshot[];
}

const AtomSettings: React.FC<AtomSettingsProps> = ({snapshotHistory}) => {
  // https://github.com/srigar/multiselect-react-dropdown

  // Make filterArray into array of objects, we want to get the most recent so that we have all possible options
  let arr = [];
  for (let key in snapshotHistory[snapshotHistory.length - 1]
    .filteredSnapshot) {
    const obj = {name: key};
    arr.push(obj);
  }

  // Use React hooks to change options array initially set as arr
  const [options, setOptions] = useState(arr);
  const updateOptions = (updatedArr: any) => setOptions(updatedArr);

  // onSelect & onRemove functions for when selecting & removing atoms/selectors from the filter
  const onSelect = (selectedList: any, selectedItem: any) => {
    console.log('This is onSelect selectedList: ', selectedList);
    console.log('This is onSelect selectedItem: ', selectedItem);
    updateOptions(selectedList);
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    console.log('This is onRemove selectedList: ', selectedList);
    console.log('This is onRemove removedItem: ', removedItem);
    updateOptions(selectedList);
  };

  // each time a new atom or selector is added, we need to update the options arry

  console.log('SUCCESS options: ', options);
  console.log('SUCCESS thisstateOptions: ', arr);
  return (
    <div>
      <h2>Atom and Selector Filter</h2>
      <Multiselect
        options={arr}
        selectedValues={options}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
      />
    </div>
  );
};

export default AtomSettings;
