import React from 'react';
import Visualizer from '../src/app/components/Visualizer';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  findByTestId,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@babel/polyfill';

test('loads and displays visualizer', async () => {
  const {getAllByTestId} = render(<Visualizer />);
  const visualizerLength = await getAllByTestId('canvas');
  console.log('length of visualizer', visualizerLength[0]);
});
