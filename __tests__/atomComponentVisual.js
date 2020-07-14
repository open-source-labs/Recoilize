import React from 'react';
import AtomComponentVisualContainer from '../src/app/Containers/AtomComponentTreeContainer';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@babel/polyfill';
import {componentAtomTreeMock, filteredCurSnapMock} from '../mock/snapshot.js';

afterEach(cleanup);

it('renders & matches snapshot - no props', () => {
  const {asFragment} = render(<AtomComponentVisualContainer />);
  expect(asFragment()).toMatchSnapshot();
});

it('renders & matches snapshot - componetAtomTree props', () => {
  const {asFragment} = render(
    <AtomComponentVisualContainer
      filteredSnapshot={filteredCurSnapMock}
      componentAtomTree={componentAtomTreeMock}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
