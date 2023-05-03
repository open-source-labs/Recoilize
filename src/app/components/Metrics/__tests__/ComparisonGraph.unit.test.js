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