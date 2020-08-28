import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';

import {render, fireEvent} from '@testing-library/react';

// importing necessary
import ThrottleSettings from '../ThrottleSettings';

// First cheeck if render without crashing
it('renders without crashing', () => {
  const root = document.createElement('div');
  ReactDOM.render(<ThrottleSettings />, root);
});

// todo: snapshot testing
it('renders & matches snapshot', () => {
  const {asFragment} = render(<ThrottleSettings />);
  expect(asFragment()).toMatchSnapshot();
});

it('renders to the dom with the correct content better', () => {
  const root = document.createElement('div');
  ReactDOM.render(<ThrottleSettings throttleDisplay={1000} />, root);
  const {getByText} = getQueriesForElement(root);
  expect(getByText('Enter Throttle')).not.toBeNull();
  expect(getByText('Enter')).not.toBeNull();
  expect(getByText('Reset')).not.toBeNull();
  expect(getByText('Current throttle is 1000 ms')).not.toBeNull();
});

it('Check the user input typing', () => {
  const {getByLabelText, getByText, debug} = render(
    <ThrottleSettings throttleDisplay={1000} />,
  );
  const input = getByLabelText('Enter Throttle');

  fireEvent.change(input, {target: {value: 500}}); // this successfully changes the value
  expect(input.value).toEqual('500');
});

// todo: Make sure the onclicks are working properly using jest mack
it('Check the onclick buttons', () => {
  // creating mock functions for chrome
  chrome.runtime.connect = function () {
    return {postMessage: function () {}};
  };
  let setThrottleDisplay = jest.fn();
  chrome.devtools = {inspectedWindow: {}};

  // Rendering the component
  const {getByText, debug} = render(
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

// get the button to run mock function instead of actual
