import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, getByText} from '@testing-library/dom';
import '@testing-library/jest-dom'

import {render, generateStore, screen, cleanup} from '../../../tests/testing';

import Tree from '../Tree';

// this test is loosely based on this article on rendering React tests https://betterprogramming.pub/react-testing-library-configuration-for-productive-unit-testing-5d0c446f3b3d

// this is our mock state that we will use to run our tests
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';

afterEach(cleanup);

it('Current Tree Renders', () => {
  // define default store from state snapshot
  const store = generateStore({ snapshot: snapshotHistoryMock})

  // here we are using our custom render function imported from testing file in tests folder. this wraps our component in a provider
  // we then supply a store containing the snapshot
  render(<Tree />, {providers: { store }})

  // should have squares 0 through 8
  expect(screen.queryByText('square-0')).toBeInTheDocument();
  expect(screen.queryByText('square-1')).toBeInTheDocument();
  expect(screen.queryByText('square-2')).toBeInTheDocument();
  expect(screen.queryByText('square-3')).toBeInTheDocument();
  expect(screen.queryByText('square-4')).toBeInTheDocument();
  expect(screen.queryByText('square-5')).toBeInTheDocument();
  expect(screen.queryByText('square-6')).toBeInTheDocument();
  expect(screen.queryByText('square-7')).toBeInTheDocument();
  expect(screen.queryByText('square-8')).toBeInTheDocument();

  // each square should have '4 keys', so we will get an array with 9 '4 keys'
  expect(screen.queryAllByText('4 keys')[0]).toBeInTheDocument();
  expect(screen.queryAllByText('4 keys')[8]).toBeInTheDocument();

  // each square should have node to node subscriptions
  expect(screen.queryAllByText('nodeToNodeSubscriptions')[0]).toBeInTheDocument();

  // root should have 12 keys
  expect(screen.queryByText('12 keys')).toBeInTheDocument();

  // each square should have content '-', so we will get an array of 9 '-'
  expect(screen.queryAllByText('"-"')[0]).toBeInTheDocument();
  expect(screen.queryAllByText('"-"')[8]).toBeInTheDocument();
});
