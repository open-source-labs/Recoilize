// currently giving this just the snapshot
// also needs selectZoomState test (5.2023)

import React from 'react';
import { 
  cleanup, 
  generateStore, 
  render 
} from '../../testignore/testing'; // custom testing functions necessary to pass tests

import AtomComponentVisualContainer from '../../../app/components/ComponentGraph/AtomComponentContainer'; // component being tested
import {snapshotHistoryMock} from '../../../../mock/state-snapshot'; // this is our mock state that we will use to run our tests



afterEach(cleanup);

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
