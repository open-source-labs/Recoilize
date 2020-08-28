import React from 'react';
import ReactDOM from 'react-dom';
import Diff from '../Diff';

import {render, cleanup, getByText, fireEvent} from '@testing-library/react';
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

describe('Raw Toggle Button', () => {
  beforeAll(cleanup);
  afterAll(cleanup);
  const {getByText, debug} = render(<Diff />);
  const rawToggle = getByText('Raw');

  it('raw button should be color #989898 at initial render', () => {
    expect(rawToggle).toHaveStyle('color: #989898');
  });

  it('raw button should change to color #E6E6E6 after clicked', () => {
    fireEvent.click(rawToggle);
    debug();
    expect(rawToggle).toHaveStyle('color: #E6E6E6');
  });
});

it('should match snapshot when no props are passed in', () => {
  const {asFragment} = render(<Diff />);
  expect(asFragment()).toMatchSnapshot();
});

it('should match snapshot when props are passed in', () => {
  const {asFragment} = render(<Diff {...mockProps} />);
  expect(asFragment()).toMatchSnapshot();
});
