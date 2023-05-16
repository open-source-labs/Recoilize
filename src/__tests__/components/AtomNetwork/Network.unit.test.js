// currently, this test does not cover ability to drag atoms/selectors in the visualizer (5.2023)

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  cleanup,
  fireEvent,
  generateStore,
  render,
  screen,
} from '../../testignore/testing'; // custom testing functions necessary to pass tests

import Network from '../../../app/components/AtomNetwork/AtomNetwork'; // component we're testing
import {snapshotHistoryMock} from '../../../../mock/state-snapshot'; // this is our mock state that we will use to run our tests


afterEach(cleanup);

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

it('Displays all selectors when selector button is clicked', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });
  // render the network
  const rendered = render(<Network />, {providers: {store}});
  // select the button we are looking for
  const selectorButton = screen.getByRole('button', {name: 'SELECTOR'});

  // when network is first rendered, atoms should not be displayed
  // here, gameendselector returns an invisible svg element
  let gameEndSelector = screen.getByText('gameEndSelector');
  expect(gameEndSelector).not.toBeVisible();

  // // click the selector button
  fireEvent.click(selectorButton);

  // game selector should now be visible
  gameEndSelector = screen.getAllByText('gameEndSelector')[1];
  expect(gameEndSelector).toBeVisible();
})

it('Selects specific selector when specific selector button is clicked', () => {
  const atomNetwork = {searchValue: ''};
  const store = generateStore({
    atomNetwork: atomNetwork,
    snapshot: snapshotHistoryMock,
  });

  // render the network
  const rendered = render(<Network />, {providers: {store}});
  // select the main selector button
  const selectorButton = screen.getByRole('button', {name: 'SELECTOR'});

  // click the selector button
  fireEvent.click(selectorButton);

  // get selector button with id "gameEndSelector"
  const gameEndSelector = screen.getAllByText('gameEndSelector')[1];
  // when gameEndSelector selector is first rendered, it should not have selectorSelected/selectorNotSelected class
  expect(gameEndSelector).not.toHaveClass('selectorNotSelected');
  expect(gameEndSelector).not.toHaveClass('selectorSelected');

  // click square-1 atom button
  fireEvent.click(gameEndSelector);
  // square should then be updated to be selected
  expect(gameEndSelector).toHaveClass('selectorSelected');
  expect(gameEndSelector).not.toHaveClass('selectorNotSelected');
});