// this unit test is currently failing. there appears to be an issue with the custom 'render' function. (5.2023)

import React from 'react';
import '@testing-library/jest-dom';
import { 
  cleanup,  
  generateStore, 
  render, 
} from '../../../testignore/testing'; // custom testing functions necessary to pass tests

import Metrics from '../../../../app/components/Metrics/MetricsContainer'; // component being tested
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot'; // this is our mock state that we will use to run our tests



afterEach(cleanup);

const store = generateStore({snapshot: snapshotHistoryMock});

describe('Metrics rendering', () => {
  it('should render properly', () => {
      const metricsWrapper = document.createElement('div');
      metricsWrapper.id = 'metricsWrapper';
      document.body.appendChild(metricsWrapper)
      render(<Metrics />, {providers: {store}});
    });
});