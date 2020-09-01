import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';

import {render, fireEvent} from '@testing-library/react';

import VisualContainer from '../VisualContainer';

it('Visual Container Renders', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const {getByPlaceholderText, debug} = render(
    <VisualContainer snapshotHistory={[]} />,
  );
});
