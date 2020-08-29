import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';

import {render, fireEvent} from '@testing-library/react';

import Navbar from '../Navbar';

it('renders to the dom', () => {
  const {debug} = render(<Navbar tabsList={[]} />);
});

it('renders to the dom with the tab name', () => {
  const {getByText} = render(
    <Navbar tabsList={['testtab1', 'testtab2', 'testtab3']} />,
  );

  getByText('testtab1');
});
