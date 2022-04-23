// import {useAppSelector} from '../../state-management/hooks';
// import {selectAtomsAndSelectorsState} from '../../state-management/slices/AtomsAndSelectorsSlice';
// import {atom, selector} from 'recoil';

// // assign the selectors and atoms objects to a variables to use for the creation of recoil atoms and selectors

// const object = useAppSelector(selectAtomsAndSelectorsState);
// const atomsAndSelectorsObject = object.atomsAndSelectors;

// export const atomsArray = atomsAndSelectorsObject.atoms;
// export const $selectors = atomsAndSelectorsObject.$selectors;

// const madeAtoms = {};
// const madeSelectors = {};

// console.log('ATOMS AND SELECTORS FILE ATOMS: ', atomsArray);
//iterate through the atomsArray and create new atoms associated with their key and default value
// atomsArray.forEach(atom => {
//   // create a new recoil atom for each element in the atomsArray and export the return value
//   atom({
//     key: atom.key,
//     default: 'I exist'
//   })
// });
// iterate through each property on the $selectors object to create new recoil selectors
