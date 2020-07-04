import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VisualContainer from '../src/app/Containers/VisualContainer';

configure({adapter: new Adapter()});

describe('Visual Container Tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<VisualContainer />);
  });
  it('Visual Container should render NavBar component', () => {
    const navLength = wrapper.find('.VisualContainer');
    expect(navLength.length).toEqual(1);
  });
});
