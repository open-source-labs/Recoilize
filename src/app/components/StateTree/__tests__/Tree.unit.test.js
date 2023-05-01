import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';

import {render, fireEvent, generateStore} from '../../../tests/testing';

import Tree from '../Tree';

// this is our mock state that we will use to run our tests
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';

it('Current Tree Renders', () => {
  // define default store
  const store = generateStore({ snapshot: snapshotHistoryMock})
  // const {getByPlaceholderText, debug} = render(<Tree />, {providers: { store }});
  render(<Tree />, {providers: { store }})
});

// want this test to render the tree component, then test that the tree component contains expected states, content, node deps
// currently getting TypeError: Cannot read properties of undefined (reading 'filteredSnapshot') because we haven't provided any state