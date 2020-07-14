import React from 'react';
import ReactDOM from 'react-dom';
import Visualizer from '../src/app/components/Visualizer';
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  screen,
  findByTestId,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@babel/polyfill';

const propSnapshot = {
  dummyAtom1: {
    contents: {hello: [], hi: []},
    nodeDeps: [],
    nodetoNodeSubscriptions: [],
    type: 'RecoilState',
  },
  listState: {
    contents: [{text: 'list item'}, {text: 'list item'}, {text: 'list item'}],
    nodeDeps: [],
    nodetoNodeSubscriptions: ['selectorTest', 'stateLengths'],
    type: 'RecoilState',
  },
  listState2: {
    contents: [{text: 'list item'}, {text: 'list item'}, {text: 'list item'}],
    nodeDeps: [],
    nodetoNodeSubscriptions: ['stateLengths'],
    type: 'RecoilState',
  },
  selectorTest: {
    contents: 'test',
    nodeDeps: ['listState'],
    nodetoNodeSubscriptions: [],
    type: 'RecoilValueReadOnly',
  },
  stateLengths: {
    contents: 6,
    nodeDeps: ['listState', 'listState2'],
    nodetoNodeSubscriptions: [],
    type: 'RecoilValueReadOnly',
  },
};

afterEach(cleanup);

it('it renders without crashing', () => {
  const {getByTestId} = render(<Visualizer />);
  expect(getByTestId('canvas')).toBeTruthy();
});

it('should match snapshot', () => {
  const {asFragment} = render(<Visualizer />);
  expect(asFragment()).toMatchSnapshot();
});

it('should render Recoil Root as text', () => {
  const {getByTestId} = render(<Visualizer />);
  expect(getByTestId('canvas')).toHaveTextContent('Recoil Root');
});

it('if data gets passed into Visualizer', () => {
  const {asFragment} = render(<Visualizer filteredCurSnap={propSnapshot} />);
  expect(asFragment()).toMatchSnapshot();
});
