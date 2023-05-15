import React, {useState} from 'react';
import AtomComponentVisual from '../../../app/components/ComponentGraph/AtomComponentVisual';
import {
  render,
  cleanup,
  generateStore,
  screen,
  fireEvent,
} from '../../testignore/testing';
import '@testing-library/jest-dom/extend-expect';

// this is our mock state that we will use to run our tests
import {snapshotHistoryMock} from '../../../../mock/state-snapshot';

afterEach(cleanup);

// define array of atoms to be passed down as props
const atoms = [
  'playStart',
  'square-0',
  'square-1',
  'square-2',
  'square-3',
  'square-4',
  'square-5',
  'square-6',
  'square-7',
  'square-8',
  'currentPlayerState',
];

it('Renders the component', () => {
  // generate store
  const store = generateStore({snapshot: snapshotHistoryMock});
  // need to include a div with class component because AtomComponentVisual needs it to render
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);

  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas);

  const rendered = render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={
        snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']
      }
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={atoms}
      selectors={{'gameEndSelector': false}}
      selectedRecoilValue={['square-0', 'atom']}
    />,
    {providers: {store}},
  );

  // find all box elements- should have 9 because mock data is tic tac toe game
  const box = screen.getAllByText('Box');
  // box elements should be visible
  expect(box[0]).toBeVisible();
  // should have 9 box elements
  expect(box.length).toBe(9);
});

it('Expand and collapse buttons show expanded and collapsed graph', () => {
  // generate store
  const store = generateStore({snapshot: snapshotHistoryMock});

  // need to include a div with class component because AtomComponentVisual needs it to render
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);

  // need to have an element with an id of 'canvas' in order to render svgContainer
  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas);

  const rendered = render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={
        snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']
      }
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={atoms}
      selectors={{'gameEndSelector': false}}
      selectedRecoilValue={['square-0', 'atom']}
    />,
    {providers: {store}},
  );

  // find hr elements, these only exist in expanded view
  let hr = screen.queryByText('HR');
  // element should not exist in collapsed view
  expect(hr).toBeNull();

  // find expand button
  const expandButton = screen.getByTestId('expand');
  // click expand button
  fireEvent.click(expandButton);

  // should show expanded content
  // find HR element
  hr = screen.getByText('HR');
  // it should be visible in expanded view
  expect(hr).toBeVisible();
});

// when atom is hovered over, it should display atom, atom values, and title
it('Displays atom details when mouse hovers over atom', () => {
  // generate store
  const store = generateStore({snapshot: snapshotHistoryMock});

  // need to include a div with class component because AtomComponentVisual needs it to render
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);

  // need to have an element with an id of 'canvas' in order to render svgContainer
  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas);

  render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={
        snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']
      }
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={atoms}
      selectors={{'gameEndSelector': false}}
      selectedRecoilValue={['square-0', 'atom']}
    />,
    {providers: {store}},
  );

  // should not display "atomic values" before hovering on a specific element
  let atomicValues = screen.queryByText('Atomic Values');
  expect(atomicValues).toBeNull();

  // find first node- each one will be a circle with a mouseover listener that displays atomic values when hovered
  // first node is playground render
  const nodes = screen.getAllByTestId('node');

  fireEvent.mouseOver(nodes[0]);

  atomicValues = screen.getByText('Atomic Values');
  expect(atomicValues).toBeVisible();
});

// when ATOM button is clicked, should display all atoms
it('Displays list of atom buttons when ATOM button is clicked', () => {
  // generate store
  const store = generateStore({snapshot: snapshotHistoryMock});

  // need to include a div with class component because AtomComponentVisual needs it to render
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);

  // need to have an element with an id of 'canvas' in order to render svgContainer
  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas);

  // here, atoms have to be an object because setAtomList is expecting an object
  render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={
        snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']
      }
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={{
        playStart: 'playStart',
        'square-0': 'square-0',
        'square-1': 'square-1',
        'square-2': 'square-2',
        'square-3': 'square-3',
        'square-4': 'square-4',
        'square-5': 'square-5',
        'square-6': 'square-6',
        'square-7': 'square-7',
        'square-8': 'square-8',
        currentPlayerState: 'currentPlayerState',
      }}
      selectors={{'gameEndSelector': false}}
      selectedRecoilValue={['square-0', 'atom']}
    />,
    {providers: {store}},
  );

  // make sure list of atom buttons do not display before atom button is clicked
  let square1 = screen.queryByText('square-1');
  expect(square1).toBeNull();

  // find 'ATOM' button
  const atomButton = screen.getByRole('button', {name: 'ATOM'});

  // click atom button
  fireEvent.click(atomButton);

  // square 1 button should now be visible
  square1 = screen.getByText('square-1');
  expect(square1).toBeVisible();
});

it('Highlights specific atom button when specific atom button in atom dropdown is clicked', () => {
  // generate store
  const store = generateStore({snapshot: snapshotHistoryMock});

  // need to include a div with class component because AtomComponentVisual needs it to render
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);

  // need to have an element with an id of 'canvas' in order to render svgContainer
  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas);

  // here, atoms have to be an object because setAtomList is expecting an object
  render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={
        snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']
      }
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={{
        playStart: 'playStart',
        'square-0': 'square-0',
        'square-1': 'square-1',
        'square-2': 'square-2',
        'square-3': 'square-3',
        'square-4': 'square-4',
        'square-5': 'square-5',
        'square-6': 'square-6',
        'square-7': 'square-7',
        'square-8': 'square-8',
        currentPlayerState: 'currentPlayerState',
      }}
      selectors={{'gameEndSelector': false}}
      selectedRecoilValue={['square-0', 'atom']}
      setSelectedRecoilValue={jest.fn()}
    />,
    {providers: {store}},
  );

  // find 'ATOM' button
  const atomButton = screen.getByRole('button', {name: 'ATOM'});

  // click atom button to display dropdown atom list
  fireEvent.click(atomButton);

  // square 1 button should now be visible
  const square1 = screen.getByText('square-1');

  // square 1 button should not be selected or not selected when first rendered
  expect(square1).not.toHaveClass('atomSelected');
  expect(square1).not.toHaveClass('atomNotSelected');

  // click square 1 button
  fireEvent.click(square1);

  // square 1 should be selected
  expect(square1).toHaveClass('atomSelected');

  // find square 2 button
  const square2 = screen.getByText('square-2');

  // click square 2 button
  fireEvent.click(square2);

  // square 1 should now not be selected
  expect(square1).toHaveClass('atomNotSelected');
  // square 2 should be selected
  expect(square2).toHaveClass('atomSelected');
});

it('Highlights specific selector button when specific selector button in atom dropdown is clicked', () => {
  // generate store
  const store = generateStore({snapshot: snapshotHistoryMock});

  // need to include a div with class component because AtomComponentVisual needs it to render
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);

  // need to have an element with an id of 'canvas' in order to render svgContainer
  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas);

  // here, atoms have to be an object because setAtomList is expecting an object
  render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={
        snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']
      }
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={{
        playStart: 'playStart',
        'square-0': '-',
        'square-1': '-',
        'square-2': '-',
        'square-3': '-',
        'square-4': '-',
        'square-5': '-',
        'square-6': '-',
        'square-7': '-',
        'square-8': '-',
        currentPlayerState: 'currentPlayerState',
      }}
      selectors={{'gameEndSelector': false}}
      selectedRecoilValue={['square-0', 'atom']}
      setSelectedRecoilValue={jest.fn()}
    />,
    {providers: {store}},
  );

  // game end selector should not be visible when first rendered
  let gameEnd = screen.queryByText('gameEndSelector');
  expect(gameEnd).toBeNull();

  // find selector button
  const selector = screen.getByRole('button', {name: 'SELECTOR'})

  // click selector button
  fireEvent.click(selector);

  // game end selector should be visible after selector button is clicked
  gameEnd = screen.getByText('gameEndSelector');
  expect(gameEnd).toBeVisible();

  // game end selector should not be visible when selector button is clicked again
  // click selector button
  fireEvent.click(selector);
  // game end selector should not be visible
  gameEnd = screen.queryByText('gameEndSelector');
  expect(gameEnd).toBeNull();
})

it('Updates selector class when other selector is clicked', () => {
  // generate store
  const store = generateStore({snapshot: snapshotHistoryMock});

  // need to include a div with class component because AtomComponentVisual needs it to render
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);

  // need to have an element with an id of 'canvas' in order to render svgContainer
  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas);

  // here, atoms have to be an object because setAtomList is expecting an object
  render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={
        snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']
      }
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={{
        playStart: 'playStart',
        'square-0': '-',
        'square-1': '-',
        'square-2': '-',
        'square-3': '-',
        'square-4': '-',
        'square-5': '-',
        'square-6': '-',
        'square-7': '-',
        'square-8': '-',
        currentPlayerState: 'currentPlayerState',
      }}
      selectors={{'gameEndSelector': false, 'nextPlayerSetSelector': 'O'}}
      selectedRecoilValue={['square-0', 'atom']}
      setSelectedRecoilValue={jest.fn()}
    />,
    {providers: {store}},
  );

  // find selector button
  const selector = screen.getByRole('button', {name: 'SELECTOR'})

  // click selector button
  fireEvent.click(selector);

  // game end selector should be visible after selector button is clicked, should not have any classes
  const gameEnd = screen.getByText('gameEndSelector');
  expect(gameEnd).not.toHaveClass('selectorNotSelected');
  expect(gameEnd).not.toHaveClass('selectorSelected');
  
  // click gameEndSelector
  fireEvent.click(gameEnd)

  // game end should have class selector selected
  expect(gameEnd).toHaveClass('selectorSelected');
  expect(gameEnd).not.toHaveClass('selectorNotSelected')

  // find next player button
  const nextPlayer = screen.getByText('nextPlayerSetSelector')
  expect(nextPlayer).not.toHaveClass('selectorSelected');

  // click next player button
  fireEvent.click(nextPlayer);

  // next player should be selected, gameend should not be selected
  expect(nextPlayer).toHaveClass('selectorSelected');
  expect(gameEnd).toHaveClass('selectorNotSelected');
});