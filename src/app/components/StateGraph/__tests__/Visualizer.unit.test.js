import React from 'react';
import ReactDOM from 'react-dom';
import { formatFiberNode } from '../../../../../package/formatFibreNode.js';
import Visualizer from '../Visualizer';
import {filteredCurSnapMock} from '../../../../../mock/snapshot.js';
import {render, cleanup, findByTestId} from '@testing-library/react';

afterEach(cleanup);
describe('Metrics tab testing', () => {
  describe('props beings passed into Visualizer component', () => {
    //create dummy object to match it against
    const node = {
      tag: 1, 
      name: 'string',
      children: [],
      actualDuration: 5,
      recoilNodes: []
    };
    //toMatchObject OR toHaveProperty
    expect(/*incoming object*/).toMatchObject(node);

    // it('argument being passed in to Visualizer should be an object', () => {
    //   const 
    // })
    // it('shape of argument being passed in should be the same shape as node')
    xit('should match snapshot when props are passed into Visualizer', () => {
      const {asFragment} = render(
        <Visualizer filteredCurSnap={filteredCurSnapMock} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  })

  describe('components rendering correctly', ()=> {
    xit('it renders without crashing', () => {
      const {getByTestId} = render(<Visualizer />);
      expect(getByTestId('canvas')).toBeTruthy();
    });
    
    xit('should match snapshot when no props are passed in', () => {
      const {asFragment} = render(<Visualizer />);
      expect(asFragment()).toMatchSnapshot();
    });
    xit('should render Recoil Root as text', () => {
      const {getByTestId} = render(<Visualizer />);
      expect(getByTestId('canvas')).toHaveTextContent('Recoil Root');
    });
  })
});
