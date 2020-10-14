import React from 'react';
import ReactDOM from 'react-dom';
import RankedGraph from '../Visualizer';
import {componentAtomTree} from '../../../../types';
import {filteredCurSnapMock} from '../../../../../mock/snapshot.js';
import {render, cleanup, findByTestId} from '@testing-library/react';

afterEach(cleanup);

describe('Ranked Graph testing', () => {
  describe('props beings passed into RankedGraph component', () => {
    xit('shape of props being passed down should be the same shape as testNode', ({
      componentAtomTree,
    }) => {
      //create dummy object to match it against
      const testNode = {
        children: [],
        name: 'string',
        tag: 1,
        recoilNodes: [],
        actualDuration: 5,
      };
      expect(componentAtomTree).toMatchObject(testNode);
    });
    xit('should match snapshot when props are passed into Visualizer', () => {
      const {asFragment} = render(
        <RankedGraph filteredCurSnap={filteredCurSnapMock} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('components are displaying correct information', () => {
    //if info is being passed into this graph through props then we can check if
    //a certain component is being passed down ex. props.renderTime props.name
    describe('graph info', () => {
      // const textBar = document.createElement('div');
      // const textDisplay = document.createTextNode('');
      // textBar.appendChild(textDisplay);
      //
      //a component should display the name of the component
      //create a mock dom element to check against
      xit('should be of type string', () => {
        //that dom element should render a string
        //is toBe the right assertion?
        const mockComponent = expect().toBe();
      });

      xit('should display correct name', () => {
        //that dom element should display the correct name
        //expect name to be props.name
        expect().toBe();
      });
    });

    describe('render time information', () => {
      //a component should display the render time of a component
      //create a mock dom element to check against
      xit('should be of type number', () => {
        //the type of data being rendered should be a number
        //is this the right assertion?
        expect().toBe();
      });

      xit('should display render time', () => {
        //a component should display render times
        //not sure what to test it against
        expect().toBe();
      });
    });
  });
  //this test will cover a component being highlighted correctly when hovered upon
  describe('component highlighting', () => {
    xit('DOM element should be displayed when hovered over');
    xit('component should have a hover on effect');
  });

  describe('components rendering correctly', () => {
    xit('it renders without crashing', () => {
      const {getByTestId} = render(<RankedGraph />);
      expect(getByTestId('canvas')).toBeTruthy();
    });

    xit('should match snapshot when no props are passed in', () => {
      const {asFragment} = render(<RankedGraph />);
      expect(asFragment()).toMatchSnapshot();
    });

    xit('should render Recoil Root as text', () => {
      const {getByTestId} = render(<RankedGraph />);
      expect(getByTestId('canvas')).toHaveTextContent('Recoil Root');
    });
  });
});
