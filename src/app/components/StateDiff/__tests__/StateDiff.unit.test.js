import React from 'react';
import ReactDOM from 'react-dom';
import Diff from '../Diff';

import {render, cleanup, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  filteredPrevSnapMock,
  filteredCurSnapMock,
} from '../../../../../mock/snapshot.js';

afterEach(cleanup);

const mockProps = {
  filteredPrevSnap: filteredPrevSnapMock,
  filteredCurSnap: filteredCurSnapMock,
};

it('should match snapshot when no props are passed in', () => {
  const {asFragment} = render(<Diff />);
  expect(asFragment()).toMatchSnapshot();
});

it('should match snapshot when props are passed in', () => {
  const {asFragment} = render(<Diff {...mockProps} />);
  expect(asFragment()).toMatchSnapshot();
});
