import React from 'react';
import '@testing-library/dom';
import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react';
import { 
  cleanup, 
  generateStore, 
  render, 
} from '../../testignore/testing'; // custom testing functions necessary to pass tests

import ThrottleSettings from '../../../app/components/Settings/ThrottleSettings'; // component being tested
import { snapshotHistoryMock } from '../../../../mock/state-snapshot'; // this is our mock state that we will use to run our tests


afterEach(cleanup);
const throttleDisplayMock = 1000;
const store = generateStore({snapshot: snapshotHistoryMock, throttle: throttleDisplayMock});

// Check the render
describe('Throttle Component renders correctly', () => {
  it('should render properly', () => {
    const throttle = document.createElement('div');
    throttle.id = 'throttle';
    document.body.appendChild(throttle)
    render(<ThrottleSettings />, {providers: {store}});
  });

  it('should render correct content', () => {
    const throttle = document.createElement('div');
    throttle.id = 'throttle';
    document.body.appendChild(throttle)
    render(<ThrottleSettings />, {providers: {store}});
  
    expect(screen.getByText('Enter Throttle')).toBeVisible();
    expect(screen.getByText('Enter')).toBeVisible();
    expect(screen.getByText('Reset')).toBeVisible();
    expect(screen.getByText('Current throttle is ms')).toBeVisible();
  });
});

//Snapshot gets replaced by empty snapshot
// describe('Throttle Snapshots Testing', () => {
//   it('should match snapshots', () => {
//     const asFragment = render(<ThrottleSettings />);
//     expect(asFragment).toMatchSnapshot();
//   });
// });

describe('Check button and user input functionalities', () => {
  it('Check the user input typing', () => {
    render(<ThrottleSettings />);
    const input = screen.getByPlaceholderText('enter in milliseconds');
    fireEvent.change(input, {target: {value: 500}}); // this successfully changes the value
    expect(input.value).toEqual('500');
  });

  it('Check the enter and reset button', () => {
    // creating mock functions for chrome
    chrome.runtime.connect = function () {
      return {postMessage: function () {}};
    };
    let setThrottleDisplay = jest.fn();
    chrome.devtools = {inspectedWindow: {}};

    render(<ThrottleSettings
    throttleDisplay={1000}
    setThrottleDisplay={setThrottleDisplay}
  />)
    // Testing the buttons
    const submitButton = screen.getByText('Enter'); // check these buttons -- how to test
    const resetButton = screen.getByText('Reset');
    fireEvent.click(submitButton);
    fireEvent.click(resetButton);
  });
});