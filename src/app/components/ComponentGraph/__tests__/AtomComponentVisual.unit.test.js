import React from 'react';
import AtomComponentVisualContainer from '../AtomComponentContainer';
import AtomComponentVisual from '../AtomComponentVisual';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@babel/polyfill';
import {
  componentAtomTreeMock,
  filteredCurSnapMock,
} from '../../../../../mock/snapshot';

afterEach(cleanup);

xit('testing to see if the component is properly rendered', () => {
  // Now that we have the componentClassDiv appended, we get the same svg error as AtomComponentContainer test
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);
  // This test fails because it cannot find the element with class 'Component'
  const atomTree = {children: []};
  const {component, debug} = render(
    // possibly test 'setStr', 'selectedRecoilValue', 'componentAtomTree' props
    <AtomComponentVisual
      selectors={[]}
      atoms={[]}
      componentAtomTree={atomTree}
    />,
    componentClassDiv,
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
