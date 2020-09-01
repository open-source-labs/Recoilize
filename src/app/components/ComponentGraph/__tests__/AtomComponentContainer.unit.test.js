import React from 'react';
import AtomComponentVisualContainer from '../AtomComponentContainer';
import {cleanup, render} from '@testing-library/react';

afterEach(cleanup);

xit('testing to see if the component is properly rendered', () => {
  // This test gets 'TypeError: Cannot read property 'baseVal' of undefined
  // because Jest doesn't fully support testing SVGs yet
  const atomTree = {children: []};
  const {component, debug} = render(
    <AtomComponentVisualContainer componentAtomTree={atomTree} />,
  );
  debug();
});
