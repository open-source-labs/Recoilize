import React from 'react';
import ComparisonGraph from '../ComparisonGraph';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom'

import {fireEvent, generateStore, screen} from '../../../tests/testing';
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';


//currently at 1.58% coverage

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
});
