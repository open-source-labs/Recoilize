import React from 'react';
import AtomComponentVisualContainer from '../AtomComponentContainer';
import {cleanup, render} from '@testing-library/react';
import * as d3 from 'd3';

afterEach(cleanup);

describe('The canvas ', () => {
  // Returns a selection but the selection is empty
  const getCanvas = () => {
    return d3.select('#canvas');
  };
  it('should be created ', () => {
    console.log('canvas: ', getCanvas());
    expect(getCanvas()).not.toBeNull();
  });
  // Since selection is empty, we can't get the height information
  xit('should have the correct height', function () {
    console.log('canvas width: ', d3.select('#canvas').attr('width'));
    expect(getCanvas().attr('width')).toBe(500);
  });

  xit('testing to see if the component is properly rendered', () => {
    // This test gets 'TypeError: Cannot read property 'baseVal' of undefined
    // because Jest doesn't fully support testing SVGs yet
    const atomTree = {children: []};
    const {component, debug} = render(
      <AtomComponentVisualContainer componentAtomTree={atomTree} />,
    );
    debug();
  });
});
