import React from 'react';
import AtomComponentVisual from '../AtomComponentVisual';
import {cleanup, render} from '@testing-library/react';
afterEach(cleanup);

it('testing to see if the component is properly rendered', () => {
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
