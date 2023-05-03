import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';
import '@testing-library/jest-dom';


import {render, fireEvent, generateStore, screen} from '../../../tests/testing';

// import VisualContainer from '../VisualContainer';

// this is our mock state that we will use to run our tests
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';

it('Visual Container Renders', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const {getByPlaceholderText, debug} = render(
    <VisualContainer snapshotHistory={[]} />,
  );
});
