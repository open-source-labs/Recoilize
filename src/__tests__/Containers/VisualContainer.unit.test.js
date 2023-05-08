// All SnapshotContainer tests written 5.2023
import React from 'react';
import { Provider } from 'react-redux';
import "@testing-library/jest-dom";

import { VisualContainer } from '../../app/Containers/VisualContainer';
import { cleanup, generateStore, render, screen } from '../testing';
// this is our mock state that we will use to run our tests (for future tests)
import { snapshotHistoryMock } from '../../../mock/state-snapshot'

const store = generateStore({ snapshot: snapshotHistoryMock})

beforeEach(async () => {
  await render(
    <Provider store={store}>
      <VisualContainer />
    </Provider>
  )
});

afterEach(cleanup);

describe('Visual Container Component', () => {
  /* <----- Render Visual Container without crashing test -----> */
  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });
  // not sure if these two ^⌄ are essentially the same
  /* <----- Render Visual Container test -----> */
  it('should render a Visual container', () => {
    render(
      <Provider store={store}>
        <VisualContainer />
      </Provider>
    )
  });
});
