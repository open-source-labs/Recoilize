import React from 'react';
// import {getQueriesForElement, getByText} from '@testing-library/dom';
import {fireEvent, screen, asFragment, getByPlaceholderText} from '@testing-library/react';
import {cleanup, render, generateStore} from '../../../tests/testing';
import ThrottleSettings from '../ThrottleSettings';
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';
import '@testing-library/dom';
import '@testing-library/jest-dom'
import '@testing-library/react'

afterEach(cleanup);
const throttleDisplayMock = 1000;
const store = generateStore({snapshot: snapshotHistoryMock, throttle: throttleDisplayMock});


//curently at 11, now at 100%%

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
