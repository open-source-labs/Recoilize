import React from 'react';
const { Multiselect } = require('multiselect-react-dropdown');
import { selectedTypes } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../state-management/hooks';
import { setSelected } from '../../state-management/slices/SelectedSlice';

const AtomSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  //Retrieve snapshotHistory State from Redux Store
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const renderIndex = useAppSelector(state => state.snapshot.renderIndex);
  const selected = useAppSelector(state => state.selected.selectedData);

  // https://github.com/srigar/multiselect-react-dropdown
  // Make filterArray into array of objects, we want to get the most recent so that we have all possible options
  const options: selectedTypes[] = [];
  // filling the options with the most recent
  for (let key in snapshotHistory[renderIndex].filteredSnapshot) {
    const obj: selectedTypes = {name: key};
    options.push(obj);
  }

  // ! setting up the selected options
  const selected2: selectedTypes[] = [];
  for (let i = 0; i < selected.length; i++) {
    selected2.push({name: selected[i].name});
  }

  // Todo: Create a conditional that will update the selected options onchange of the array -- updates if they are not equal, will add in NEW ADDITIONS (??.20??) -> don't know what this is referring to or if it was executed (5.2023)
  // onSelect & onRemove functions for when selecting & removing atoms/selectors from the filter
  const onSelect = (selectedList: selectedTypes[]): void => {
    dispatch(setSelected(selectedList)); // propdrilled, so edited up top
  };

  const onRemove = (selectedList: selectedTypes[]): void => {
    dispatch(setSelected(selectedList));
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
