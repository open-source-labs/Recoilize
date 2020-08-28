import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';

import {render, fireEvent} from '@testing-library/react';

import ThrottleSettings from '../ThrottleSettings';

// Check the render
describe('Throttle Component renders correctly', () => {
  beforeEach(() => {
    const {} = render(<ThrottleSettings throttleDisplay={1000} />);
  });
  it('renders without crashing', () => {
    const root = document.createElement('div');
    ReactDOM.render(<ThrottleSettings />, root);
  });
  it('renders to the dom with the correct content', () => {
    const root = document.createElement('div');
    ReactDOM.render(<ThrottleSettings throttleDisplay={1000} />, root);
    const {getByText} = getQueriesForElement(root);
    expect(getByText('Enter Throttle')).not.toBeNull();
    expect(getByText('Enter')).not.toBeNull();
    expect(getByText('Reset')).not.toBeNull();
    expect(getByText('Current throttle is 1000 ms')).not.toBeNull();
  });
});

describe('Throttle Snapshots Testing', () => {
  it('renders & matches snapshots', () => {
    const {asFragment} = render(<ThrottleSettings />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Check button and user input functionalities', () => {
  it('Check the user input typing', () => {
    const {getByPlaceholderText} = render(
      <ThrottleSettings throttleDisplay={1000} />,
    );
    const input = getByPlaceholderText('enter in milliseconds');

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

    // Rendering the component
    const {getByText} = render(
      <ThrottleSettings
        throttleDisplay={1000}
        setThrottleDisplay={setThrottleDisplay}
      />,
    );
    // Testing the buttons
    const submitButton = getByText('Enter'); // check these buttons -- how to test
    const resetButton = getByText('Reset');
    fireEvent.click(submitButton);
    fireEvent.click(resetButton);
  });
});
