import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import {render, fireEvent} from '@testing-library/react';
import NavBar from '../../../app/components/NavBar/NavBar';

// check that component renders
it('renders to the dom', () => {
  const {debug} = render(<NavBar tabsList={[]} />);
});

// pass in test tabs to nav bar component
it('renders to the dom with the tab name', () => {
  const {getByText} = render(
    <NavBar tabsList={['testtab1', 'testtab2', 'testtab3']} />,
  );

  const tab1 = getByText('testtab1');
  expect(tab1).toBeVisible();
});

// test clicking NavBar tab
it('sets tab when tab is clicked', () => {
  const {getByText} = render(
    <NavBar
      setTab={jest.fn()}
      tab={'testtab1'}
      tabsList={['testtab1', 'testtab2', 'testtab3']}
    />,
  );

  // get tab1
  const tab1 = getByText('testtab1');

  expect(tab1).toHaveStyle({color: '#E6E6E6'});

  // click tab1
  // note: setTab function is not properly mocked, so this doesn't do anything
  fireEvent.click(tab1);

  // tab 2 should not be selected
  const tab2 = getByText('testtab2');
  expect(tab2).toHaveStyle({color: '#989898'});
});
