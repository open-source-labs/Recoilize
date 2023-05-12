// All MainContainer tests were written 5.2023
import React from 'react';
import { Provider } from 'react-redux';
import "@testing-library/jest-dom";

import { MainContainer } from '../../app/Containers/MainContainer';
import { cleanup, generateStore, render, screen } from '../testignore/testing';
// this is our mock state that we will use to run our tests
import { snapshotHistoryMock } from '../../../mock/state-snapshot'

const store = generateStore({ snapshot: snapshotHistoryMock})

beforeEach(() => {
  render(
    <Provider store={store}>
      <MainContainer />
    </Provider>
  )
});

afterEach(cleanup);

describe('Snapshot Component', () => {
    // SnapshotContainer contains a useEffect with .scrollIntoView(). The below allows us to test this in jest by creating a mock of the function
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
  /* <----- Render Main Container test -----> */
  it('should render a main container', () => {
    render(
      <Provider store={store}>
        <MainContainer />
      </Provider>
    )
  })

  /* <----- Render SnapshotsContainer test -----> */
  // snapshot container has it's own testing file. simply checking that it is rendered in the main container
  it('should render a snapshot component', () => {
    const snapshotsContainer = screen.getByTestId("SnapshotsContainer");
    expect(snapshotsContainer).toBeInTheDocument();
  });

  /* <----- Render VisualContainer test -----> */
  // visual container has it's own testing file. simply checking that it is rendered in the main container
  it('should render a visual component', () => {
    const visualContainer = screen.getByTestId("VisualContainer");
    expect(visualContainer).toBeInTheDocument();
  });
});