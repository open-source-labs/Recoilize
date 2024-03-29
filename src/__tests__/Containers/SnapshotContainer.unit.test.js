// All SnapshotContainer tests written 5.2023
import React from 'react';
import { Provider } from 'react-redux';
import "@testing-library/jest-dom";
import { 
  cleanup, 
  generateStore, 
  render, 
  screen 
} from '../testignore/testing'; // custom testing functions necessary to pass tests

import { SnapshotsContainer } from '../../app/Containers/SnapshotContainer';
// this is our mock state that we will use to run our tests (for future tests)
import { snapshotHistoryMock } from '../../../mock/state-snapshot'


const store = generateStore({ snapshot: snapshotHistoryMock})

beforeEach(async () => {
  await render(
    <Provider store={store}>
      <SnapshotsContainer />
    </Provider>
  )
});

afterEach(cleanup);

describe('Snapshot Component Rendering', () => {
  // SnapshotContainer contains a useEffect with .scrollIntoView(). The below allows us to test this in jest by creating a mock of the function
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
  /* <----- Render Snapshot Container without crashing test -----> */
  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });
  // not sure if these two ^⌄ are essentially the same
  /* <----- Render Snapshot Container test -----> */
  it('should render a snapshot container', () => {
    render(
      <Provider store={store}>
        <SnapshotsContainer />
      </Provider>
    )
  })

  /* <----- Render clear-snapshots-title div test -----> */
  it('should render a clear snapshot component', () => {
    const clearSnapshots = screen.getByTestId("clear-snapshots-title");
    expect(clearSnapshots).toBeInTheDocument();
  });

  /* <----- Render Previous Button test -----> */
  it(`should render a 'previous' button`, () => {
    const previousButton = screen.getByRole('button', { name: 'Previous' });
    expect(previousButton).toBeInTheDocument();
  });
  // need to test button functionality. no test for this currently (5.2023)

  /* <----- Render Forward Button test -----> */
  it(`should render a 'forward' button`, () => {
    const forwardButton = screen.getByRole('button', { name: 'Forward' });
    expect(forwardButton).toBeInTheDocument();
  });
    // need to test button functionality. no test for this currently (5.2023)


  /* <----- Render Save Series Button test -----> */
  it('should render a button to save the series', () => {
   const saveSeriesButton = screen.getByRole('button', { name: 'Save Series' });
   expect(saveSeriesButton).toBeInTheDocument();
  });
  // no test for button functionality b/c no button functionality? (5.2023)

  /* <----- Render Snapshot Series List container test -----> */
  it('should render container that contains the snapshot series', () => {
    const snapshotList = screen.getByTestId("SnapshotsList");
    expect(snapshotList).toBeInTheDocument();
  })

   /* <----- Render Snapshot Divs test -----> */
   it('should render snapshot divs', () => {
    const snapshotDivs = screen.getByTestId("snapshotDiv");
    expect(snapshotDivs).toBeInTheDocument();
  })

});

// would benefit from testing functionality of each item within this container
describe('SnapshotContainer Functionality', () => {

});