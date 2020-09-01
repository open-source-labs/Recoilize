import React from 'react';
import Network from '../AtomNetwork';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@babel/polyfill';
import {filteredCurSnapMock} from '../../../../../mock/snapshot.js';

afterEach(cleanup);

it('renders & matches snapshot', () => {
  const {asFragment} = render(<Network />);
  expect(asFragment()).toMatchSnapshot();
});

it('loads and displays Network component', () => {
  const {getByTestId} = render(<Network />);
  expect(getByTestId('networkCanvas')).toBeTruthy();
});

it('if empty object props is passed into Network', () => {
  const {asFragment} = render(<Network filteredCurSnap={{}} />);
  expect(asFragment()).toMatchSnapshot();
});

it('if mock data object prop is passed into Network', () => {
  const {asFragment} = render(
    <Network filteredCurSnap={filteredCurSnapMock} />,
  );
  expect(asFragment()).toMatchSnapshot();
});
