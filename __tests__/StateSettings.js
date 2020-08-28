import React from 'react';
import ReactDOM from 'react-dom';
import StateSettings from './../src/app/components/Settings/StateSettings';

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

  // ToDo: possibly add a test for onChange function
});

it('should match snapshot when no props are passed in', () => {
  const {asFragment} = render(<StateSettings />);
  expect(asFragment()).toMatchSnapshot();
});

it('should match snapshot when props are passed in', () => {
  const {asFragment} = render(<StateSettings {...mockProps} />);
  expect(asFragment()).toMatchSnapshot();
});
