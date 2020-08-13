import React, {useState} from 'react';
import {filterArray} from '../../SnapshotList/index'; // array of atoms/selectors
import {Multiselect} from 'multiselect-react-dropdown';

const AtomSettings: React.FC = () => {
  // filterArray is blank before Jump button is pressed
  // filterArray is populated when Jump button is pressed
  // https://github.com/srigar/multiselect-react-dropdown

  // Testing out hooks...can be deleted later (take out incrementAge below)
  const [age, setAge] = useState(19);
  const incrementAge = () => setAge(age + 1);

  // Make filterArray into array of objects
  let arr = [];
  for (let i = 0; i < filterArray.length; i += 1) {
    // "name" key set to equal the displayValue in Multiselect class
    let obj = {name: filterArray[i]};
    arr.push(obj);
  }

  // Use React hooks to change options array initially set as arr
  const [options, setOptions] = useState(arr);
  const updateOptions = updatedArr => setOptions(updatedArr);

  // onSelect & onRemove functions for when selecting & removing atoms/selectors from the filter
  const onSelect = (selectedList: any, selectedItem: any) => {
    console.log('This is onSelect selectedList: ', selectedList);
    console.log('This is onSelect selectedItem: ', selectedItem);
    incrementAge();
    updateOptions(selectedList);
  };

  const onRemove = (selectedList: any, removedItem: any) => {
    console.log('This is onRemove selectedList: ', selectedList);
    console.log('This is onRemove removedItem: ', removedItem);
    incrementAge();
    updateOptions(selectedList);
  };

  //import "./styles.css";
  // this.state needed to work with Multiselect, not sure why
  this.state = {
    options: arr, //has to be an array of objects
    selectedValues: arr, // sets values as preselected
  };

  //console.log('This is the arr: ', arr);
  console.log('SUCCESS This is filterArray imported:  ', filterArray);
  console.log('SUCCESS Correct Age', age);
  console.log('SUCCESS options: ', options);
  console.log('SUCCESS thisstateOptions: ', this.state.options);
  return (
    <div>
      <h2>Atom and Selector Filter</h2>
      <p>Create a drop down menu with all atoms and selectors</p>
      <p>I am {age} years old</p>
      <Multiselect
        options={this.state.options}
        selectedValues={this.state.selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
      />
    </div>
  );
};

export default AtomSettings;
