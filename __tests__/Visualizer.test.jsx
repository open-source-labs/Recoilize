import React from 'react';
import Visualizer from '../src/app/components/Visualizer';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@babel/polyfill';

xit('loads and displays visualizer', async () => {
  render(<Visualizer />);
  expect(screen.findByTestId('canvas')).toBe(true);
});
