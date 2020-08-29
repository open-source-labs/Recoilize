import React from 'react';
import AtomComponentVisualContainer from '../AtomComponentContainer';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@babel/polyfill';
import {
  componentAtomTreeMock,
  filteredCurSnapMock,
} from '../../../../../mock/snapshot';

afterEach(cleanup);

xit('testing to see if the component is properly rendered', () => {
  // This test fails because it cannot find the element with class 'Component'
  const atomTree = {children: []};
  const {component, debug} = render(
    // possibly test 'setStr', 'selectedRecoilValue', 'componentAtomTree' props
    <AtomComponentVisual
      selectors={[]}
      atoms={[]}
      componentAtomTree={atomTree}
    />,
  );
  debug();
});

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
