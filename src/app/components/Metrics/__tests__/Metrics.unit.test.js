import React from 'react';
import {render, generateStore, cleanup} from '../../../tests/testing';
import Metrics from '../MetricsContainer';
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';
import '@testing-library/jest-dom'

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