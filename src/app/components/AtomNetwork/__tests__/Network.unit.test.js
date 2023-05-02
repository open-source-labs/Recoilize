import React from 'react';
import Network from '../AtomNetwork';
import {
  render,
  cleanup,
  generateStore,
  screen,
  fireEvent,
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
  const rendered = render(<Network />, {providers: {store}});
  expect(rendered).toMatchSnapshot();
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

// when button with id AtomP is clicked, it should change color
it('Atom button changes color when clicked', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });
  // render the network
  const rendered = render(<Network />, {providers: {store}});
  // select the button we are looking for
  const atomButton = screen.getByRole('button', {name: 'ATOM'});
  // when component is first rendered, class list should have atomP and atomLegendDefault
  expect(atomButton.classList[1]).toBe('atomLegendDefault');
  // click the atom button
  fireEvent.click(atomButton);
  // class list should change to atom selected
  expect(atomButton.classList[1]).toBe('atomSelected');
}) 
