import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AtomTree from '../src/app/components/AtomTree.jsx';
import * as d3 from 'd3';
import makeTree from '../src/app/utils/makeTreeConversion';

// newer enzyme versions require an adapter for React v16
configure({adapter: new Adapter()});

describe('Atom tree visualizer unit test', () => {
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
  let Visualizer;
  beforeAll(() => {
    Visualizer = shallow(<AtomTree newSnap={propSnapshot} />);
  });
  it(`<AtomTree /> should render an svg with id 'canvas' `, () => {
    expect(Visualizer.find('svg').is('#canvas')).toEqual(true);
  });
  //   it('Expect AtomTree to render d3 elements', () => {
  //     const allD3 = Visualizer.find('svg').find('g');
  //     expect(allD3.length).toEqual(35);
  //   });
});
