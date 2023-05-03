// import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
// import '@testing-library/dom';

// import {render, fireEvent, generateStore, screen} from '../../../tests/testing';


// /* Original
// import SnapshotContainer from '../SnapshotContainer';
// it('Snapshot Container Renders', () => {
//     window.HTMLElement.prototype.scrollIntoView = jest.fn();
//     const {getByPlaceholderText, debug} = render(
//         <SnapshotContainer snapshotHistory={[]} />,
//         );
//       });
// */
 

// // this is our mock state that we will use to run our tests
// // import { filteredCurSnapMock, filteredPrevSnapMock } from '../../../../../mock/snapshot';

// it('Snapshot Container Renders', () => {
//   // define default store from state snapshot
//   const store = generateStore({ 
//     currentSnapshot: filteredCurSnapMock,
//     previousSnapshot: filteredPrevSnapMock,
//   })

//   // here we are using our custom render function imported from testing file in tests folder. this wraps our component in a provider
//   // we then supply a store containing the snapshots
//   render(<Snapshot />, {providers: { store }})


// })



import { cleanup, fireEvent, render } from '@testing-library/react';
import { SnapshotsContainer } from '../SnapshotContainer';

afterEach(cleanup);

describe('Snapshot Component', () => {
  render(<SnapshotsContainer />)
  /* <----- Render clear-snapshots-title div test -----> */
  test('Clear Snapshots Component Renders', () => {
    const clearSnapshots = screen.getByTestId("clear-snapshots-title");
    expect(clearSnapshots).toBeInTheDocument();
  });
   /* <----- Render Previous Button test -----> */
  test('Previous Button Renders', () => {
    const previousButton = screen.getByTestId("prevClr"); 
    expect(previousButton).toBeInTheDocument();
  });
  /* <----- Render Previous Button test -----> */
  test('Forward Button Renders', () => {
    const forwardButton = screen.getByTestId("fwrdClr");
    expect(forwardButton).toBeInTheDocument();
  });
});