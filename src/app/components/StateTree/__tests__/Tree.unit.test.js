import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';

import {render, fireEvent} from '@testing-library/react';

import Tree from '../Tree';

it('Current Tree Renders', () => {
  const {getByPlaceholderText, debug} = render(<Tree filterCurSnap={[]} />);
});
