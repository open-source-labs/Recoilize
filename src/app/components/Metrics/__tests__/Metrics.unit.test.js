import React from 'react';
import '@testing-library/jest-dom'

import {render, generateStore, screen, cleanup} from '../../../tests/testing';

import Metrics from '../MetricsContainer';

// this test is loosely based on this article on rendering React tests https://betterprogramming.pub/react-testing-library-configuration-for-productive-unit-testing-5d0c446f3b3d

// this is our mock state that we will use to run our tests
import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';
// import React from 'react';
// import Metrics from '../MetricsContainer';
// import {render, cleanup} from '@testing-library/react';
// import '@testing-library/dom';
// import '@testing-library/jest-dom'

// import {screen} from '../../../tests/testing';
// import { snapshotHistoryMock } from '../../../../../mock/state-snapshot';

afterEach(cleanup);
const mock = snapshotHistoryMock.cleanComponentAtomTree;
// TO-DO
// import prop object being passed down to metric graphs to be tested
describe('Metrics rendering', () => {
  it('should render properly', () => {
    const store = generateStore({ snapshot: snapshotHistoryMock})
    const asFragment = render(
        <Metrics/>, {providers: {store}})
      expect(asFragment).toMatchSnapshot();
  });
  xit('should have cleanComponentAtomTree, data, height, and width', () => {
    const store = generateStore({ snapshot: snapshotHistoryMock})
    const asFragment = render(
        <Metrics/>, {providers: {store}})
      expect(asFragment).toMatchSnapshot();
  });
});

// })
// //create a shallow copy of Metrics component passing in expected prop
// const wrapper = shallow(<Metrics includedProp={cleanedComponentAtomTree}/>);
// describe('shape of props being passed down should match cleanedComponentAtomTree shape', () => {
//     expect(wrapper.props().includedProp).toMatchObject(componentAtomTree);
// });
// describe('component is being rendered correctly', () => {
//     const { getByTestId } = render(<Metrics />);
//     //if the component rendered then it has to have return an element with id 'canvas'
//     //getBy returns an error when not finding an element, here is is looking for an id of canvas
//     expect(getByTestId('canvas')).toBeTruthy();