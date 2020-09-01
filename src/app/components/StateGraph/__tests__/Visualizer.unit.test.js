import React from 'react';
import ReactDOM from 'react-dom';
import Visualizer from '../Visualizer';
import {filteredCurSnapMock} from '../../../../../mock/snapshot.js';
import {render, cleanup, findByTestId} from '@testing-library/react';

afterEach(cleanup);

xit('it renders without crashing', () => {
  const {getByTestId} = render(<Visualizer />);
  expect(getByTestId('canvas')).toBeTruthy();
});

xit('should match snapshot when no props are passed in', () => {
  const {asFragment} = render(<Visualizer />);
  expect(asFragment()).toMatchSnapshot();
});

xit('should render Recoil Root as text', () => {
  const {getByTestId} = render(<Visualizer />);
  expect(getByTestId('canvas')).toHaveTextContent('Recoil Root');
});

xit('should match snapshot when props are passed into Visualizer', () => {
  const {asFragment} = render(
    <Visualizer filteredCurSnap={filteredCurSnapMock} />,
  );
  expect(asFragment()).toMatchSnapshot();
});
