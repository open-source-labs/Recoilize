import React from 'react';
import ReactDOM from 'react-dom';
import StateSettings from './../src/app/components/Settings/StateSettings';

import {render, cleanup, getByTestId, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

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

  const mockProps = {
    checked: false,
    setChecked: jest.fn(checked =>
      checked ? (checked = false) : (checked = true),
    ),
  };
  it('is rendered correctly', () => {
    const {getByTestId} = render(<StateSettings />);
    expect(getByTestId('stateSettingsToggle')).toHaveAttribute(
      'type',
      'checkbox',
    );
  });

  it('is unchecked initially', () => {
    const {getByTestId} = render(<StateSettings checked={mockProps.checked} />);
    const inputCheckbox = getByTestId('stateSettingsToggle');
    expect(inputCheckbox).toHaveProperty('checked', false);
  });

  it('toggles to true when checked', () => {
    const mockPersistStateFunc = jest.fn(() => mockProps.setChecked());
    const {getByTestId} = render(<StateSettings {...mockProps} />);
    const inputCheckbox = getByTestId('stateSettingsToggle');
    inputCheckbox.onchange(mockPersistStateFunc);
    expect(inputCheckbox).toHaveProperty('onChange', mockPersistStateFunc);
    fireEvent.click(inputCheckbox);
    expect(inputCheckbox).toHaveProperty('checked', true);
  });
});

it('should match snapshot when no props are passed in', () => {
  const {asFragment} = render(<StateSettings />);
  expect(asFragment()).toMatchSnapshot();
});

// it ('matches snapshot', () => {

// })
