import React from 'react';
import ReactDOM from 'react-dom';
import StateSettings from './../src/app/components/Settings/StateSettings';

import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StateSettings />, div);
});

it('renders persist state text correctly', () => {
  const {getByTestId} = render(<StateSettings />);
  expect(getByTestId('stateSettings')).toHaveTextContent('Persist State');
});

// it('renders persist state text correctly', () => {
//   const {getByTestId} = render(<StateSettings />);
//   expect(getByTestId('stateSettings')).toHave
// });
