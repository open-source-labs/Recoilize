import React, {useState, useEffect} from 'react';
const {Multiselect} = require('multiselect-react-dropdown'); // https://www.npmjs.com/package/multiselect-react-dropdown
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
  // Make filterArray into array of objects, we want to get the most recent so that we have all possible options
  let options: any[] = [];
  for (let key in snapshotHistory[snapshotHistory.length - 1]
    .filteredSnapshot) {
    const obj = {name: key};
    options.push(obj);
  }
  console.log('WHEN IS OPTIONS CREATED: ', options);

  // ! Selected is prop drilled down from app -> maincontainer -> visualcontainer -> settings -> atom settings

  // Use React hooks to change options array initially set as options
  const [selectedOptions, setOptions] = useState(options);

  console.log('OPTIONS selected: ', selected);
  console.log('OPTIONS selectedOptions: ', selectedOptions);

  // Todo: Create a conditional that will update the selected options onchange of the array -- updates if they are not equal, will add in NEW ADDITIONS
  // if (!(JSON.stringify(options) === JSON.stringify(selected))) {
  //   console.log('we hit');
  //   setSelected(options);
  // }
  // onSelect & onRemove functions for when selecting & removing atoms/selectors from the filter
  const onSelect = (selectedList: any, selectedItem: any) => {
    //console.log('This is onSelect selectedList: ', selectedList);
    //console.log('This is onSelect selectedItem: ', selectedItem);
    selected.push(selectedItem);
    setOptions(selectedList);
    setSelected(selected); // propdrilled, so edited up top
    console.log('This is selected AFTER onSelect: ', selected);
    console.log('These are options onSelect ', options);
    console.log('This is selectedOption onSelect: ', selectedOptions);
  };
  const onRemove = (selectedList: any, removedItem: any) => {
    //console.log('This is onRemove selectedList: ', selectedList);
    //console.log('This is onRemove removedItem: ', removedItem);

    // Remove removedItem from selected
    selected.splice(selected.indexOf(removedItem), 1);
    setOptions(selectedList);
    setSelected(selected);
    console.log('This is selected AFTER onRemove: ', selected);
    console.log('These are the options onRemove', options);
    console.log('This is selectedOption onRemove: ', selectedOptions);
  };

  // each time a new atom or selector is added, we need to update the selectedOptions arry

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
