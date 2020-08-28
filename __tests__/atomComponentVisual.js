import React from 'react';
import AtomComponentVisualContainer from '../src/app/components/ComponentGraph/AtomComponentContainer';
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

xit('renders & matches snapshot - no props', () => {
  const {asFragment} = render(<AtomComponentVisualContainer />);
  expect(asFragment()).toMatchSnapshot();
});

xit('renders & matches snapshot - componetAtomTree props', () => {
  const {asFragment} = render(
    <AtomComponentVisualContainer
      filteredSnapshot={filteredCurSnapMock}
      componentAtomTree={componentAtomTreeMock}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
