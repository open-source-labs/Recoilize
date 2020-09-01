import React from 'react';
import ReactDOM from 'react-dom';
import Diff from '../Diff';

import {
  render,
  cleanup,
  getByText,
  fireEvent,
  debug,
} from '@testing-library/react';
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
describe('Diff Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Diff />, div);
  });
});

describe('Raw Toggle Button', () => {
  beforeAll(cleanup);
  afterAll(cleanup);

  it('raw button should be color #989898 at initial render', () => {
    const {getByText} = render(<Diff />);
    expect(getByText('Raw')).toHaveStyle('color: #989898');
  });

  it('raw button should change to color #E6E6E6 after clicked', () => {
    const {getByText} = render(<Diff />);
    fireEvent.click(getByText('Raw'));
    expect(getByText('Raw')).toHaveStyle('color: #E6E6E6');
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
