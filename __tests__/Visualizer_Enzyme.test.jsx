import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Visualizer from '../src/app/components/Visualizer';
import * as d3 from 'd3';
import makeTree from '../src/app/utils/makeTreeConversion';

// newer enzyme versions require an adapter for React v16
configure({adapter: new Adapter()});

xdescribe('Atom tree visualizer unit test', () => {
  let Visualizer;
  beforeAll(() => {
    Visualizer = shallow(<Visualizer newSnap={propSnapshot} />);
  });
  it(`<AtomTree /> should render an svg with id 'canvas' `, () => {
    expect(Visualizer.find('svg').is('#canvas')).toEqual(true);
  });
  //   it('Expect AtomTree to render d3 elements', () => {
  //     const allD3 = Visualizer.find('svg').find('g');
  //     expect(allD3.length).toEqual(35);
  //   });
});
