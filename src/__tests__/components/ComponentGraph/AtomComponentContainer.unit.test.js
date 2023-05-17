import React from 'react';
import AtomComponentVisualContainer from '../../../app/components/ComponentGraph/AtomComponentContainer';
import {cleanup, render, generateStore} from '../../testignore/testing';

afterEach(cleanup);

// this is our mock state that we will use to run our tests
import {snapshotHistoryMock} from '../../../../mock/state-snapshot';

// define zoom for state (in zoom slice)
// test is still able to generate automatic zoom data without this
const zoom = {zoomData: {k: 0.09, x: 221, y: 662}}

it('Atom component container renders', () => {
  // component needs a div with id of "canvas" in order to render
  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas)

  // define default store from state snapshot
  const store = generateStore({snapshot: snapshotHistoryMock, zoom: zoom});
  render(<AtomComponentVisualContainer />, {providers: {store}});
});
