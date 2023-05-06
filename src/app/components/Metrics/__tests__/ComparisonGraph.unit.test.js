import React from 'react';
import ComparisonGraph from '../ComparisonGraph';
import {render, cleanup, fireEvent, generateStore, screen} from '../../../tests/testing';

import '@testing-library/dom';
import '@testing-library/jest-dom'

import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';


//currently at 79% coverage

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
const store = generateStore({ snapshot: snapshotHistoryMock})

afterEach(cleanup);

describe('Comparison graph constains correct components', () => {
  it('should render properly', () => {
    const canvas = document.createElement('div');
    canvas.id = 'canvas';
    document.body.appendChild(canvas)

    render(
      <ComparisonGraph
        data={mock}
        width={mockWidth}
        height={mockHeight}
      />,
      {providers: { store }}
    )
  });

  it('should render correct components', () => {
    // render ranked graph
    render(
      <ComparisonGraph
      data={mock}
      width={mockWidth}
      height={mockHeight}
      />
      )
      expect(screen.getByText('Delete Series')).toBeVisible();
      expect(screen.getByText('current')).toBeVisible();
      expect(screen.getByText('past')).toBeVisible();
  });
});

describe('Check button functionality', () => {
  it('Check the delete button', () => {
    // creating mock functions for chrome
    chrome.runtime.connect = function () {
      return {postMessage: function () {}};
    };
    let deleteSeries = jest.fn();
    chrome.devtools = {inspectedWindow: {}};

    render(<ComparisonGraph
    data={deleteSeries}
    width={mockWidth}
    height={mockHeight}
    />
    )
    // Testing the buttons
    const deleteButton = screen.getByText('Delete Series'); // check these buttons -- how to test
    fireEvent.click(deleteButton);
  });
});