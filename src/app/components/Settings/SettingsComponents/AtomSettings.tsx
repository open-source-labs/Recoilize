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
  let options = [];
  for (let key in snapshotHistory[snapshotHistory.length - 1] // filling the options with the most recent
    .filteredSnapshot) {
    const obj = {name: key};
    options.push(obj);
  }

  // ! setting up the selected options
  let selected2 = [];
  for (let i = 0; i < selected.length; i++) {
    selected2.push({name: selected[i].name});
  }

  // Todo: Create a conditional that will update the selected options onchange of the array -- updates if they are not equal, will add in NEW ADDITIONS
  // onSelect & onRemove functions for when selecting & removing atoms/selectors from the filter
  const onSelect = (selectedList: any, selectedItem: any) => {
    setSelected(selectedList); // propdrilled, so edited up top
  };
  const onRemove = (selectedList: any, removedItem: any) => {
    setSelected(selectedList);
  };

  return (
    <div>
      <h2>Atom and Selector Filter</h2>
      <Multiselect
        options={options}
        selectedValues={selected2}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
      />
    </div>
  );
};
export default AtomSettings;
