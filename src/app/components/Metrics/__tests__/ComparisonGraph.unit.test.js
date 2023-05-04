import React from 'react';
import ComparisonGraph from '../ComparisonGraph';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom'

import {fireEvent, generateStore, screen} from '../../../tests/testing';
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';


//currently at 1.58% coverage

/*            What should we be testing for the Comparison Graph?
- Keeps track of individual component render time (meaning the PlaygroundRender, Board, Row in our mock data)
- For our tests, the Comparison graph component needs the data ([{name: , actualDuration}]), height, and width (these two we can create mock data for)
- We need to test:
- Rendering properly (x)
- No initial values (should not be passing because graphs are rendering when we havent started the playground)
- Check that labels are properly being passed in 
- getting atom1,2,3
- getting actualDuration

-render something with state then change what you are looking at state to see if ranked graph changes 
-rerender with new store, update store, 
- check if delete series works?
- 
*/

// const mockNoValue = [
//   {
//     name: '', 
//     actualDuration: 0
//   }
// ]

const mock = [
  {
    name: 'atom1', 
    actualDuration: 0.1345
  },
  {
    name: 'atom2', 
    actualDuration: 0.23456
  },
  {
    name: 'atom3', 
    actualDuration: 1.2357
  },
  
]

const mockHeight = 50
const mockWidth = 30

afterEach(cleanup);

describe('Comparison graph displays correct information', () => {
  it('should render data, height, and width', () => {
    // const store = generateStore({ snapshot: snapshotHistoryMock})
    const {asFragment} = render(
      <ComparisonGraph
        data={mock}
        width={mockWidth}
        height={mockHeight}
      />
    )
    //checking if new component being rendered matches the saved snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  // //check that labels are being properly passed in 
  // it('should contain data with name property', () => {
  //   // render ranked graph
  //   render(
  //     <ComparisonGraph
  //       data={mock}
  //       width={mockWidth}
  //       height={mockHeight}
  //     />
  //   )
  //   //ensure that a name property is being passed in and can be found 
  //   const atom1 = screen.getByText('atom1')
  //   const atom2 = screen.getByText('atom2')
  //   const atom3 = screen.getByText('atom3')

  //   expect(atom1).toBeVisible();
  //   expect(atom2).toBeVisible();
  //   expect(atom3).toBeVisible();
  // });
  // it('should contain data with actualDuration property', () => {
  //   // render ranked graph
  //   render(
  //     <ComparisonGraph
  //     data={mock}
  //     width={mockWidth}
  //     height={mockHeight}
  //     />
  //     )
  //     //ensure that an actualDuration property is being passed in and can be found
  //     const atom1Duration = screen.getByText('0.13ms')
  //     const atom2Duration = screen.getByText('0.23ms')
  //     const atom3Duration = screen.getByText('1.24ms')
      
  //     expect(atom1Duration).toBeVisible();
  //     expect(atom2Duration).toBeVisible();
  //     expect(atom3Duration).toBeVisible();
  //     expect(atom3Duration).not.toBe('1.2357ms'); 
  // });
});

// //Ensure that the x-axis is rendering 
// describe('Ranked graph axis label', () => {
//   it('should have an x-axis label', () => {
//     const {asFragment} = render(
//       <RankedGraph
//         data={mock}
//         width={mockWidth}
//         height={mockHeight}
//       />
//     )
//     //checking if new component being rendered initially matches snapshot
//     expect(asFragment()).toMatchSnapshot();
//   });
// });
// //This is passing, but it should not be passing
// describe('Ranked graph initial rendering', () => {
//   it('should not render without initial data', () => {
//     const {asFragment} = render(
//       <RankedGraph
//         data={mockNoValue}
//         width={mockWidth}
//         height={mockHeight}
//       />
//     )
//     //checking if new component being rendered initially matches snapshot
//     expect(asFragment()).toMatchSnapshot();
//   });
// });