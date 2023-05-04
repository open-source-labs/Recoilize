import React from 'react';
import FlameGraph from '../FlameGraph';
import {fireEvent, generateStore, screen} from '../../../tests/testing';
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';

import {
  filteredCurSnapMock,
  componentAtomTreeMock,
} from '../../../../../mock/snapshot.js';
import {render, cleanup, queryByText} from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom'
import { store } from '../../../state-management';


const mockHeight = 100
const mockWidth = 50

// define default store from state snapshot
const cleanedComponentAtomTreeData = store.getState().snapshot.cleanComponentAtomTree;
afterEach(cleanup);

describe('Flame graph displays correct information', () => {
  it('should render cleanedComponentAtomTree, width, and height', () => {
    const {asFragment} = render(
      <FlameGraph 
        cleanedComponentAtomTree={cleanedComponentAtomTreeData}
        width={mockWidth}
        height={mockHeight}
      />
    )
    expect(asFragment()).toMatchSnapshot();
  });
  //check that labels are being properly passed in 
  it('should contain cleanedComponentAtomTree', () => {
    // render flame graph
    render(
      <FlameGraph 
        cleanedComponentAtomTree={cleanedComponentAtomTreeData}
        width={mockWidth}
        height={mockHeight}
      />
    )
    const result = {
      children: [
        {
          actualDuration: 0.8450000004813774,
          children: [],
          name: 'PlaygroundStart',
          recoilNodes: [],
          tag: 0,
          treeBaseDuration: 0.5550000005314359,
          wasSuspended: false,
        },
      ],
      name: 'PlaygroundRender',
      recoilNodes: ['playStart'],
      tag: 0,
      actualDuration: 1.6750000004321919,
    };
    expect.objectContaining(result);
  });

});

//is passing, but should not be because nothing should render when no data is passed in
describe('Flame graph initial rendering', () => {
  it('should not render when no values are passed in', () => {
    const {asFragment} = render(
      <FlameGraph 
        cleanedComponentAtomTree={componentAtomTreeMock}
        width={mockWidth}
        height={mockHeight}
      />
    )
    expect(asFragment()).toMatchSnapshot();
  });
});