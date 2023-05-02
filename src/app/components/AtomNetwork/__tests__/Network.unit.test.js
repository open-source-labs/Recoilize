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

it('renders & matches snapshot', () => {
  // mock search value because AtomNetworkVisual needs search value in state
  const atomNetwork = {searchValue: ''};
  // generate store with snapshot and atomNetwork search value
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });
  // render store
  const rendered = render(<Network />, {providers: {store}});
  // rendered store should match snapshot
  expect(rendered).toMatchSnapshot();
});

it('loads and displays Network component', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });
  render(<Network />, {providers: {store}});
  // if network rendered, should have a component with id networkCanvas
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
  expect(atomButton).toHaveClass('atomLegendDefault');
  // click the atom button
  fireEvent.click(atomButton);
  // class list should change to atom selected
  expect(atomButton).toHaveClass('atomSelected');
});

// when AtomP button is clicked, should display all atoms
it('Displays all atoms when atom buttom is clicked', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });
  // render the network
  const rendered = render(<Network />, {providers: {store}});
  // select the button we are looking for
  const atomButton = screen.getByRole('button', {name: 'ATOM'});

  // when network is first rendered, atoms should not be displayed
  // here, square1 returns an invisible svg element
  const square1 = screen.getByText('square-1');
  expect(square1).not.toBeVisible();

  // click the atom button
  fireEvent.click(atomButton);

  const square = screen.getAllByText('square-1');
  expect(square[1]).toBeVisible();
});

it('Selects specific atom when specific atom button is clicked', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });

  // render the network
  const rendered = render(<Network />, {providers: {store}});
  // select the main atom button
  const atomButton = screen.getByRole('button', {name: 'ATOM'});

  // click the atom button
  fireEvent.click(atomButton);

  // get atom button with id "square-1"
  const square = screen.getAllByText('square-1')[1];
  // when square-1 atom is first rendered, it should not have atomSelected/atomNotSelected class
  expect(square).not.toHaveClass('atomNotSelected');
  expect(square).not.toHaveClass('atomSelected');

  // click square-1 atom button
  fireEvent.click(square);
  // square should then be updated to be selected
  expect(square).toHaveClass('atomSelected');
  expect(square).not.toHaveClass('atomNotSelected');

  // click square-2 button
  const square2 = screen.getByText('square-2');
  fireEvent.click(square2);
  // square 2 should be selected
  expect(square2).toHaveClass('atomSelected');
  // square 1 should not be selected
  expect(square).toHaveClass('atomNotSelected');
});
