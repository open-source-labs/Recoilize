// import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
// import {getQueriesForElement, getByText} from '@testing-library/dom';

// import {render, fireEvent} from '@testing-library/react';
// const {Multiselect} = require('multiselect-react-dropdown');

// import AtomSettings from '../AtomSettings';
// const mockprops = {
//   snapshotHistory: [{}],
//   selected: [{name: 'testname1'}, {name: 'testname2'}, {name: 'testname3'}],
//   setSelected: jest.fn(),
// };
// describe('atom settings properly rendering', () => {
//   it('Component Renders', () => {
//     const {getByPlaceholderText, debug, getByText} = render(
//       <AtomSettings {...mockprops} />,
//     );
//     getByText('testname1');
//   });
//   // Check if render without crashing
//   it('renders Atom Settings without crashing', () => {
//     const root = document.createElement('div');
//     ReactDOM.render(<AtomSettings {...mockprops} />, root);
//   });
//   it('renders Multiselect component without crashing', () => {
//     const root = document.createElement('div');
//     ReactDOM.render(<Multiselect />, root);
//   });
// })
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';
import '@testing-library/jest-dom'

import {render, fireEvent, generateStore, screen} from '../../../tests/testing';
import AtomSettings from '../AtomSettings';
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';


const {Multiselect} = require('multiselect-react-dropdown');

describe('Atom settings properyly rendering', () => {
  it ('Component Renders', () => {
    const store = generateStore({snapshot: snapshotHistoryMock})
    // render (<AtomSettings />, {providers: {store}})
    render (<AtomSettings />, {providers: {store}})

    expect(screen.queryByText('options').toBeInTheDocument())
  })
  it('renders Multiselect component without crashing', () => {
    const root = document.createElement('div');
    ReactDOM.render(<Multiselect />, root);
  });
})

s

// const mockprops = {
//   snapshotHistory: [{}],
//   selected: [{name: 'testname1'}, {name: 'testname2'}, {name: 'testname3'}],
//   setSelected: jest.fn(),
// };
// describe('atom settings properly rendering', () => {
//   it('Component Renders', () => {
//     const {getByPlaceholderText, debug, getByText} = render(
//       <AtomSettings {...mockprops} />,
//     );
//     getByText('testname1');
//   });
//   // Check if render without crashing
//   it('renders Atom Settings without crashing', () => {
//     const root = document.createElement('div');
//     ReactDOM.render(<AtomSettings {...mockprops} />, root);
//   });
//   it('renders Multiselect component without crashing', () => {
//     const root = document.createElement('div');
//     ReactDOM.render(<Multiselect />, root);
//   });
// })
