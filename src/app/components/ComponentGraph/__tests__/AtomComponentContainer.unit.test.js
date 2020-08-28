import {cleanup} from '@testing-library/react';
afterEach(cleanup);

it('does one plus one equal two?', () => {
  expect(1 + 1).toBe(2);
});

it('testing a first test for this component', () => {
  expect(2 + 2).toBe(4);
});
