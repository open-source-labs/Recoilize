import React from 'react';
import Network from '../src/app/components/AtomNetwork/AtomNetwork';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@babel/polyfill';
import {filteredCurSnapMock} from '../mock/snapshot.js';

afterEach(cleanup);

xit('renders & matches snapshot', () => {
  const {asFragment} = render(<Network />);
  expect(asFragment()).toMatchSnapshot();
});

xit('loads and displays Network component', () => {
  const {getByTestId} = render(<Network />);
  expect(getByTestId('networkCanvas')).toBeTruthy();
});

xit('if empty object props is passed into Network', () => {
  const {asFragment} = render(<Network filteredCurSnap={{}} />);
  expect(asFragment()).toMatchSnapshot();
});

xit('if mock data object prop is passed into Network', () => {
  const {asFragment} = render(
    <Network filteredCurSnap={filteredCurSnapMock} />,
  );
  expect(asFragment()).toMatchSnapshot();
});
