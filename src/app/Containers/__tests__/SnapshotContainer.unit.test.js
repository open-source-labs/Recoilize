import React from 'react';
import { render, generateStore } from '../../tests/testing';

import SnapshotContainer from '../SnapshotContainer';
import { snapshotHistoryMock } from '../../../../mock/state-snapshot';

it('Snapshot Container Renders', () => {
  const store = generateStore({ snapshot: snapshotHistoryMock})
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  render(
    <SnapshotContainer />, {providers: { store }});
});
