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

//this does not actually compare anything???

/*            What should we be testing for the Comparison Graph?
  - Keeps track of individual component render time (meaning the PlaygroundRender, Board, Row in our mock data)
  - For our tests, the ranked graph component needs the data ([{name: , actualDuration}]), height, and width (these two we can create mock data for)
    - We need to test:
      - that the current graph being rendered contains this info with data, height, and width
      - that the render time is a type of number 
      - that the name is a type string 
      - that the graph is actually comparing two things???
*/