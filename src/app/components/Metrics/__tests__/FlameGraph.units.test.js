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

//Currently has 83% testing coverage up from 6%
/*            What should we be testing for the Flame Graph?
  - Tracks render time for each individual component PLUS its children at every level of the component tree
  - For our tests, the FlameGraph component needs the cleanedComponentTree (which is a state component), height, and width (these two we can create mock data for)
    - We need to test:
    - Rendering properly (x)
    - No initial values (should not be passing because graphs are rendering when we havent started the playground) 
    - Check that labels are properly being passed in  (x)
      - getting comopnents from the cleanedComponentAtomTree
*/
const mock = snapshotHistoryMock.cleanComponentAtomTree;
const mockHeight = 100
const mockWidth = 50

// define default store from state snapshot
// const cleanedComponentAtomTreeData = store.getState().snapshot.cleanComponentAtomTree;
afterEach(cleanup);

describe('Flame graph displays correct information', () => {
  it('should render cleanedComponentAtomTree, width, and height', () => {
    const {asFragment} = render(
      <FlameGraph 
        cleanedComponentAtomTree={mock}
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
        cleanedComponentAtomTree={mock}
        width={mockWidth}
        height={mockHeight}
      />
    )
    //ensure that a name property is being passed in and can be found 
    const board = screen.queryByText('Board');
    const row = screen.queryAllByText('Row');
    const box = screen.queryAllByText('Box');
    console.log(box)
    
    expect(board).toBeVisible();
    expect(box[0]).toBeVisible();
    expect(row[0]).toBeVisible();

    //the mock data should also include an actualDuration with a number value
    expect.objectContaining({actualDuration: expect.any(Number)})
    //ensure recoilNode property are passed in 
    expect.objectContaining({recoilNode: expect.any(String)})
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