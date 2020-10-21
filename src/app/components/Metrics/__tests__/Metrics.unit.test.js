import React from 'react';
import { render, cleanup, findByTestId } from '@testing-library/react';
import { componentAtomTree } from '../../../../types';
import { shallow } from 'enzyme';
import Metrics from '../Metrics';
// import prop object being passed down to metric graphs to be tested
describe('Metrics graph testing', () => {
    afterEach(cleanup);
    //create a shallow copy of Metrics component passing in expected prop
    const wrapper = shallow(<Metrics includedProp={cleanedComponentAtomTree}/>);
    describe('shape of props being passed down should match cleanedComponentAtomTree shape', () => {
        expect(wrapper.props().includedProp).toMatchObject(componentAtomTree);
    });
    describe('component is being rendered correctly', () => {
        const { getByTestId } = render(<Metrics />);
        //if the component rendered then it has to have return an element with id 'canvas'
        //getBy returns an error when not finding an element, here is is looking for an id of canvas
        expect(getByTestId('canvas')).toBeTruthy();
    });
});
