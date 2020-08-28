import React from 'react';
import ReactDOM from 'react-dom';
import StateSettings from '../StateSettings';

import {render, cleanup, getByTestId, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const mockProps = {
  checked: false,
  setChecked: jest.fn(),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StateSettings />, div);
});

it('renders persist state text correctly', () => {
  const {getByTestId} = render(<StateSettings />);
  expect(getByTestId('stateSettings')).toHaveTextContent('Persist State');
});

describe('input checkbox', () => {
  beforeAll(cleanup);
  afterAll(cleanup);

  it('is rendered correctly', () => {
    const {getByTestId} = render(<StateSettings />);
    expect(getByTestId('stateSettingsToggle')).toHaveAttribute(
      'type',
      'checkbox',
    );
  });

  it('is unchecked initially', () => {
    const {getByTestId} = render(<StateSettings checked={mockProps.checked} />);
    const toggle = getByTestId('stateSettingsToggle');
    expect(toggle).toHaveProperty('checked', false);
  });

  it('is checked after user clicks', () => {
    const {getByTestId} = render(<StateSettings {...mockProps} />);
    const toggle = getByTestId('stateSettingsToggle');
    chrome.runtime.connect = function () {
      return {postMessage: jest.fn()};
    };
    chrome.devtools = {inspectedWindow: {}};
    fireEvent.change(toggle, {target: {checked: true}});
    expect(toggle).toBeChecked();
  });
});

it('should match snapshot when no props are passed in', () => {
  const {asFragment} = render(<StateSettings />);
  expect(asFragment()).toMatchSnapshot();
});

it('should match snapshot when props are passed in', () => {
  const {asFragment} = render(<StateSettings {...mockProps} />);
  expect(asFragment()).toMatchSnapshot();
});
