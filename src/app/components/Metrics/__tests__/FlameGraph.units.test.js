import React from 'react';
import FlameGraph from '../FlameGraph';
import {
  filteredCurSnapMock,
  componentAtomTreeMock,
} from '../../../../../mock/snapshot.js';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom'

import {fireEvent, generateStore, screen} from '../../../tests/testing';
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';


/*            What should we be testing for the Flame Graph?
  - Tracks render time for each individual component PLUS its children at every level of the component tree
  - For our tests, the FlameGraph component needs the data ([{name: , actualDuration}]), height, and width (these two we can create mock data for)
    - We need to test:
      - that the current graph being rendered contains this info with cleanedComponentAtomTree, width, height
      - that the render time is a type of number 
      - that the name is a type string 
*/

const mock = {
    actualDuration: 0,
    children: [],
    name: 'Batcher',
    recoilNodes: [],
    tag: 0,
    treeBaseDuration: 0.15499999972234946,
    wasSuspended: false,
}
const mockHeight = 100
const mockWidth = 50

afterEach(cleanup);

describe('Flame graph displays correct information', () => {
  it('should render cleanedComponentAtomTree, width, and height', () => {
    const {asFragment} = render(
      <FlameGraph cleanedComponentAtomTree={componentAtomTreeMock}
        width={mockWidth}
        height={mockHeight}
      />
    )
    expect(asFragment()).toMatchSnapshot();
  });
  //the render time in the componentAtomTree should be a number 
  xit('render time should be of type number', () => {
    expect(typeof componentAtomTreeMock.children[0].actualDuration).toBe('number');
    expect(typeof componentAtomTreeMock.children[1].actualDuration).not.toBe('undefined');
    expect(typeof componentAtomTreeMock.children[2].actualDuration).not.toBe('boolean');
    expect(typeof componentAtomTreeMock.children[3].actualDuration).not.toBe('string');
  });
  //the componentAtomTree should also contain a name which should be an string 
  xit('name should be of type string', () => {
    expect(typeof componentAtomTreeMock[0].name).toBe('string');
    expect(typeof componentAtomTreeMock[1].name).not.toBe('undefined');
    expect(typeof componentAtomTreeMock[2].name).not.toBe('boolean');
    expect(typeof componentAtomTreeMock[2].name).not.toBe('number');
  });
  //should have an initial value??
});