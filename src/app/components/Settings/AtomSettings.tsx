import React from 'react';
const {Multiselect} = require('multiselect-react-dropdown');
import {stateSnapshot, selectedTypes} from '../../../types';
interface AtomSettingsProps {
  snapshotHistory: stateSnapshot[];
  selected: selectedTypes[];
  setSelected: React.Dispatch<React.SetStateAction<selectedTypes[]>>;
}
const AtomSettings: React.FC<AtomSettingsProps> = ({
  snapshotHistory,
  selected,
  setSelected,
}) => {
  // https://github.com/srigar/multiselect-react-dropdown
  // Make filterArray into array of objects, we want to get the most recent so that we have all possible options
  const options: selectedTypes[] = [];
  for (let key in snapshotHistory[snapshotHistory.length - 1] // filling the options with the most recent
    .filteredSnapshot) {
    const obj: selectedTypes = {name: key};
    options.push(obj);
  }

  // ! setting up the selected options
  const selected2: selectedTypes[] = [];
  for (let i = 0; i < selected.length; i++) {
    selected2.push({name: selected[i].name});
  }

  // Todo: Create a conditional that will update the selected options onchange of the array -- updates if they are not equal, will add in NEW ADDITIONS
  // onSelect & onRemove functions for when selecting & removing atoms/selectors from the filter
  const onSelect = (selectedList: selectedTypes[]): void => {
    setSelected(selectedList); // propdrilled, so edited up top
  };

  const onRemove = (selectedList: selectedTypes[]): void => {
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
