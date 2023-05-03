import React from 'react';
import RankedGraph from '../RankedGraph';
import {
  filteredCurSnapMock,
  componentAtomTreeMock,
} from '../../../../../mock/snapshot.js';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom'

import {fireEvent, generateStore, screen} from '../../../tests/testing';


/*            What should we be testing for the Ranked Graph?
  - Keeps track of individual component render time (meaning the PlaygroundRender, Board, Row in our mock data)
  - For our tests, the ranked graph component needs the data ([{name: , actualDuration}]), height, and width (these two we can create mock data for)
    - We need to test:
      - that the current graph being rendered contains this info with data, height, and width
      - that the render time is a type of number 
      - that the name is a type string 
*/

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

describe('Ranked graph displays correct information', () => {
  xit('should render data, height, and width', () => {
    const {asFragment} = render(
      <RankedGraph
        data={mock}
        width={mockWidth}
        height={mockHeight}
      />
    )
    expect(asFragment()).toMatchSnapshot();
  });

  //the type of data in actual duration should be a number
  it('render time should be of type number', () => {
    expect(typeof mock[0].actualDuration).toBe('number');
    expect(typeof mock[1].actualDuration).not.toBe('undefined');
    expect(typeof mock[2].actualDuration).not.toBe('boolean');
    expect(typeof mock[2].actualDuration).not.toBe('string');
    // render ranked graph
    render(
      <RankedGraph
        data={mock}
        width={mockWidth}
        height={mockHeight}
      />
    )
    // find element with name atom 3
    const atom3 = screen.getByText('atom3')
    console.log(atom3);
    expect(atom3).toBeVisible();
    const atom1Duration = screen.getByText('0.345453453ms')
    console.log(atom1Duration)
  });

  //type of data in name should be a string
  xit('name should be of type string', () => {
    expect(typeof mock[0].name).toBe('string');
    expect(typeof mock[0].name).not.toBe('number');
    expect(typeof mock[1].name).not.toBe('boolean');
    expect(typeof mock[2].name).not.toBe('undefined');
  });

  //a component should display the name of the component
  xit('should display correct name', () => {
    //that dom element should display the correct name
  });
  xit('should render all labels', () => {
    //that dom element should display the correct name
    expect().toBe();
  });
});



describe('components rendering correctly', () => {
  xit('renders without crashing', () => {
    const {getByTestId} = render(<RankedGraph 
      data={mock}
      width={mockWidth}
      height={mockHeight}
    />);
    expect(getByTestId('canvas')).toBeTruthy();
  });

  xit('should match snapshot when props are passed into RankedGraph', () => {
    const {asFragment} = render(
      <RankedGraph filteredCurSnap={filteredCurSnapMock} 
      data={mock}
      width={mockWidth}
      height={mockHeight}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  //not sure I am understanding this 
  xit('should match snapshot when no props are passed in', () => {
    const {asFragment} = render(<RankedGraph 
      data={mock}
      width={mockWidth}
      height={mockHeight}
    />);
    expect(asFragment()).toMatchSnapshot();
  });
});