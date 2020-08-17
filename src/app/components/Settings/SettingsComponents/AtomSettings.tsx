import React, {useState, useEffect} from 'react';
import {filterArray} from '../../SnapshotList/index'; // array of atoms/selectors
const {Multiselect} = require('multiselect-react-dropdown');
import {stateSnapshot} from '../../../../types';

interface AtomSettingsProps {
  snapshotHistory: stateSnapshot[];
  selected: any;
  setSelected: any;
}

const AtomSettings: React.FC<AtomSettingsProps> = ({
  snapshotHistory,
  selected,
  setSelected,
}) => {
  // https://github.com/srigar/multiselect-react-dropdown

  // Make filterArray into array of objects, we want to get the most recent so that we have all possible options
  let options = [];
  for (let key in snapshotHistory[snapshotHistory.length - 1]
    .filteredSnapshot) {
    const obj = {name: key};
    options.push(obj);
  }

  // ! Selected is prop drilled down from app -> maincontainer -> visualcontainer -> settings -> atom settings
  // console.log('this is the selected in atomSettings ', selected);
  // we need to add to options, the NEW ones that are not in the success options

  // Use React hooks to change options array initially set as options
  const [selectedOptions, setOptions] = useState(options);

  // Todo: Create a conditional that will update the selected options onchange of the array -- updates if they are not equal, will add in NEW ADDITIONS
  // onSelect & onRemove functions for when selecting & removing atoms/selectors from the filter
  const onSelect = (selectedList: any, selectedItem: any) => {
    // console.log('This is onSelect selectedList: ', selectedList);
    // console.log('This is onSelect selectedItem: ', selectedItem);
    setOptions(selectedList);
    setSelected(selectedList); // propdrilled, so edited up top
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    // console.log('This is onRemove selectedList: ', selectedList);
    // console.log('This is onRemove removedItem: ', removedItem);
    setOptions(selectedList);
    setSelected(selectedList);
  };

  // each time a new atom or selector is added, we need to update the selectedOptions arry

  // console.log('These are the selected Options ', selectedOptions);
  // console.log('These are the state options ', options);
  return (
    <div>
      <h2>Atom and Selector Filter</h2>
      <Multiselect
        options={options}
        selectedValues={selected}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
      />
    </div>
  );
};

export default AtomSettings;
