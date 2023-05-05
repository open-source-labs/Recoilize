import React from 'react';
import AtomComponentVisual from '../AtomComponentVisual';
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
]

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
      selectors={['gameEndSelector']}
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
      selectors={['gameEndSelector']}
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

  const rendered = render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={
        snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']
      }
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={atoms}
      selectors={['gameEndSelector']}
      selectedRecoilValue={['square-0', 'atom']}
    />,
    {providers: {store}},
  );

  // should not display "atomic values" before hovering on a specific element
  let atomicValues = screen.queryByText('Atomic Values')
  expect(atomicValues).toBeNull();

  // find first node- each one will be a circle with a mouseover listener that displays atomic values when hovered
  // first node is playground render
  const nodes = screen.getAllByTestId('node');

  fireEvent.mouseOver(nodes[0]);

  atomicValues = screen.getByText('Atomic Values')
  expect(atomicValues).toBeVisible();
});
