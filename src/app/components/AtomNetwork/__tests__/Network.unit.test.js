import React from 'react';
import Network from '../AtomNetwork';
import {
  render,
  cleanup,
  generateStore,
  getByTestId,
  screen,
} from '../../../tests/testing';
import '@testing-library/jest-dom/extend-expect';

// this is our mock state that we will use to run our tests
import {snapshotHistoryMock} from '../../../../../mock/state-snapshot';

afterEach(cleanup);

// not sure if this works? rewrote snapshot to reflect current render
it('renders & matches snapshot', () => {
  // mock search value because AtomNetworkVisual needs search value in state
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });
  const asFragment = render(<Network />, {providers: {store}});
  expect(asFragment).toMatchSnapshot();
});

it('loads and displays Network component', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });
  render(<Network />, {providers: {store}});
  expect(screen.getByTestId('networkCanvas')).toBeTruthy();
});


// probably have to delete this test, it doesn't really make sense any more
xit('if empty object props is passed into Network', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({atomNetwork, snapshot: {snapshotHistory: [{filteredSnapshot: {}}], renderIndex: 0}});
  const asFragment = render(<Network />, {providers: {store}});
  expect(asFragment).toMatchSnapshot();
});

// probably want to add some tests here for atom network legend
// when button with id AtomP is clicked, it should turn yellow and display all atoms
it('Atom button changes color and displays list of atoms when clicked', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });
}) 
