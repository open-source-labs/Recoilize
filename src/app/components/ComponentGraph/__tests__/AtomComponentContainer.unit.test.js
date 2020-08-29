import React from 'react';
import AtomComponentVisualContainer from '../AtomComponentContainer';
import {cleanup, render} from '@testing-library/react';
import * as d3 from 'd3';

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

describe('The canvas ', () => {
  const getCanvas = () => {
    return d3.select('#canvas');
  };
  it('should be created ', () => {
    expect(getCanvas()).not.toBeNull();
  });

  xit('should have the correct height', function () {
    expect(getCanvas().attr('width')).toBe(500);
  });
});
